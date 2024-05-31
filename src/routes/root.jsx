import { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, LabelList, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { API_KEY, ICONS, DAYS_WEEK } from "../data/data";

const Root = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        addres: null,
        currentConditions: null,
        days: null,
        description: null,
    });
    const [currentDay, setCurrentDay] = useState([]);
    const [location, setLocation] = useState({
        longitude: 30.18,
        latitude: 59.56,
    });
    const [isCelsius, setIsCelisius] = useState(true);
    const [activeChart, setActiveChart] = useState({
        temp: true,
        humi: false,
        wind: false,
    });

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.latitude},${location.longitude}?key=${API_KEY}&lang=ru`;

    useEffect(() => {
        setIsLoading(true);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(
                json => {
                    console.log("Data received:", json.days[0].hours);
                    setData(json);
                    setCurrentDay(json.days[0].hours);
                },
                err => {
                    console.error("Fetch error:", err);
                }
            )
            .finally(() => setIsLoading(false))
    }, [url]);

    const toCelsius = (f) => {
        return ((f - 32) * (5 / 9)).toFixed(1);
    }

    const milesToMeters = (milesPH) => {
        return (milesPH / 2.011).toFixed(1);
    }

    const activeClass = 'border-b-4 border-pink-600 pb-2 cursor-pointer transition-all';

    const tempData = () => {
        return currentDay
            .map(hour => ({
                'name': hour?.datetime.slice(0, 5),
                'uv': Number(toCelsius(hour?.temp)).toFixed(0)
            }))
            .filter((element, index) => index % 3 === 1);
    }

    const humiData = () => {
        return currentDay
            .map(hour => ({
                'name': hour?.datetime.slice(0, 5),
                'uv': hour?.precipprob
            }))
            .filter((element, index) => index % 3 === 1);
    }

    const CustomAreaLabel = ({ x, y, value }) => {
        return (
            <text className="text-sm font-medium" x={x} y={y} dy={-10} fill={"#333"} fontSize={10} textAnchor="middle">
                {value}&#176;C
            </text>
        );
    }

    const CustomBarLabel = ({ x, y, width, value }) => {
        return <text className="text-sm font-medium" x={x + width / 2} y={y} fill="#0492c2" textAnchor="middle" dy={-6}>
            {value} %
        </text>;
    }

    return (
        <main className="w-4/5 mx-auto my-12">
            <div className="flex items-center justify-between">

                <div className="flex gap-4 items-center">
                    {/* <img src={ICONS.get(currentFrame.wx_code)} className="w-20 h-20" alt="weather icon" /> */}
                    <div className="flex items-start">
                        <span className="text-8xl text-zinc-800">
                            {
                                isCelsius ? (
                                    toCelsius(data?.currentConditions?.temp)
                                ) : (
                                    data?.currentConditions?.temp
                                )
                            }
                        </span>

                        <div className="flex gap-1 mt-3">
                            <span
                                className={`text-2xl font-medium cursor-pointer ${isCelsius ? "text-zinc-700" : "text-zinc-400"}`}
                                onClick={() => setIsCelisius(true)}
                            >
                                &#176;C
                            </span>
                            <span className="text-2xl font-medium text-zinc-700">
                                |
                            </span>
                            <span
                                className={`text-2xl font-medium cursor-pointer ${!isCelsius ? "text-zinc-700" : "text-zinc-400"}`}
                                onClick={() => setIsCelisius(false)}
                            >
                                &#176;F
                            </span>
                        </div>

                        <div className="flex flex-col ml-2 mt-3">
                            <span className="text-sm text-zinc-400">Вероятность осадков: {data?.currentConditions?.precipprob} %</span>
                            <span className="text-sm text-zinc-400">Влажность: {data?.currentConditions?.humidity} %</span>
                            <span className="text-sm text-zinc-400">Ветер: {milesToMeters(data?.currentConditions?.windspeed)} м/с</span>
                        </div>
                    </div>

                </div>

                <div className="flex self-start mt-3 items-end flex-col">
                    <span className="text-2xl text-zinc-800">Погода</span>
                    <CurrentDate />
                    <span className="text-zinc-400">{data?.currentConditions?.conditions}</span>
                </div>
            </div>

            <div className="flex gap-2 text-lg text-zinc-700 my-4">
                <span
                    className={activeChart.temp ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: true,
                        humi: false,
                        wind: false,
                    })}
                >
                    Температура
                </span>

                <span className="font-thin text-zinc-300">
                    |
                </span>

                <span
                    className={activeChart.humi ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: false,
                        humi: true,
                        wind: false,
                    })}
                >
                    Вероятность осадков
                </span>

                <span className="font-thin text-zinc-300">
                    |
                </span>

                <span
                    className={activeChart.wind ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: false,
                        humi: false,
                        wind: true,
                    })}
                >
                    Ветер
                </span>
            </div>

            <div>
                {activeChart.temp ? (
                    <AreaChart width={640} height={180} data={tempData()} margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="15%" stopColor="#fc46aa" stopOpacity={0.25} />
                                {/* <stop offset="95%" stopColor="#fc46aa" stopOpacity={0} /> */}
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />

                        <LabelList dataKey="name" position="top" />
                        <Area type="monotone" dataKey="uv" label={<CustomAreaLabel />} stroke="#fc46aa" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                ) : activeChart.humi ?
                    (
                        <BarChart width={640} height={180} data={humiData()} margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}>
                            <XAxis dataKey="name" />
                            <Bar dataKey="uv" barSize={30} fill="#0492c2" fillOpacity={0.25} stroke="#0492c2" strokeOpacity={0.7} strokeWidth={2}
                                label={<CustomBarLabel />} />
                        </BarChart>
                    ) : (
                        <></>

                    )
                }

            </div>
        </main>
    )
}

const CurrentDate = () => {
    let now = new Date();

    return <span className="text-zinc-400">{DAYS_WEEK[now.getDay()]} {now.getHours()}:{now.getMinutes()}</span>;
}

export default Root;