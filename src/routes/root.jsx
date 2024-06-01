import { useState, useEffect } from "react";

import { toCelsius, milesPerHourToMetersPerMinute, getCurrentHour, getData } from "../utils/supportFunctions";
import { DefaultAreaChart, DefaultBarChart, DefaulWindChart, DefaultPressureChart } from "../components/Charts";
import { API_KEY, ICONS, SHORT_DAYS_WEEK, DAYS_WEEK } from "../data/data";

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
    const [currentHour, setCurrentHour] = useState({});
    const [activeDay, setActiveDay] = useState(0);
    const [activeChart, setActiveChart] = useState({
        temp: true,
        precip: false,
        wind: false,
        pres: false,
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
                    console.log("Data received:", json);
                    setData(json);
                    setCurrentDay(json.days[0]);
                    setCurrentHour(json.days[0].hours[getCurrentHour()]);
                    console.log(currentHour);
                },
                err => {
                    console.error("Fetch error:", err);
                }
            )
            .finally(() => setIsLoading(false))
    }, [url]);

    const activeClass = 'border-b-4 border-pink-600 pb-2 cursor-pointer transition-all';

    return (
        <main className="w-4/5 mx-auto my-12">
            <div className="flex items-center justify-between">

                <div className="flex gap-4 items-center">
                    <img src={ICONS[currentHour?.icon]} className="w-20 h-20" alt="weather icon" />
                    <div className="flex items-start">
                        <span className="text-8xl text-zinc-800">
                            {
                                isCelsius ? (
                                    toCelsius(currentHour?.temp)
                                ) : (
                                    currentHour?.temp
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
                            <span className="text-sm text-zinc-400">Вероятность осадков: {currentHour?.precipprob} %</span>
                            <span className="text-sm text-zinc-400">Влажность: {currentHour?.humidity} %</span>
                            <span className="text-sm text-zinc-400">Ветер: {milesPerHourToMetersPerMinute(currentHour?.windspeed)} м/с</span>
                        </div>
                    </div>

                </div>

                <div className="flex self-start mt-3 items-end flex-col">
                    <span className="text-2xl text-zinc-800">Погода</span>
                    <CurrentDate DAYS_WEEK={DAYS_WEEK} day={currentDay} hour={currentHour} />
                    {/* <span className="text-zinc-400">{DAYS_WEEK[new Date(currentDay?.datetime).getDay()]} {currentHour}:00</span>; */}
                    <span className="text-zinc-400">{currentHour?.conditions}</span>
                </div>
            </div>

            <div className="flex gap-2 text-lg text-zinc-700 my-4">
                <span
                    className={activeChart.temp ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: true,
                        precip: false,
                        wind: false,
                        pres: false,
                    })}
                >
                    Температура
                </span>

                <span className="font-thin text-zinc-300">
                    |
                </span>

                <span
                    className={activeChart.precip ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: false,
                        precip: true,
                        wind: false,
                        pres: false,
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
                        precip: false,
                        wind: true,
                        pres: false,
                    })}
                >
                    Ветер
                </span>

                <span className="font-thin text-zinc-300">
                    |
                </span>

                <span
                    className={activeChart.pres ? activeClass : "pb-2 cursor-pointer border-b-4 border-transparent"}
                    onClick={() => setActiveChart({
                        temp: false,
                        precip: false,
                        wind: false,
                        pres: true,
                    })}
                >
                    Давление
                </span>
            </div>

            <div className="w-full">
                {activeChart.temp ? (
                    <DefaultAreaChart isCelsius={isCelsius} dataIcons={getData(currentDay.hours, 'icon')} dataCondit={getData(currentDay.hours, 'conditions')} color="#FFEF00" width={740} height={280} data={getData(currentDay.hours, 'temp')} />
                ) : activeChart.precip ?
                    (
                        <DefaultBarChart color="#0492c2" width={740} height={280} dataHumi={getData(currentDay.hours, 'humidity')} data={getData(currentDay.hours, 'precipprob')} />
                    ) : activeChart.wind ? (
                        <DefaulWindChart color="#444444" width={740} height={280} dataWindDir={getData(currentDay.hours, 'winddir')} data={getData(currentDay.hours, 'windspeed')} />
                    ) : (
                        <DefaultPressureChart color="#03c04a" width={740} height={280} data={getData(currentDay.hours, 'pressure')} />
                    )
                }

                <div className="flex gap-2">
                    {data?.days?.map((day, id) => <DayItem setCurrentHour={setCurrentHour} activeDay={activeDay} setActiveDay={setActiveDay} DAYS_WEEK={SHORT_DAYS_WEEK} data={data} day={day} toCelsius={toCelsius} isCelsius={isCelsius} setCurrentDay={setCurrentDay} key={day?.datetimeEpoch} ICONS={ICONS} id={id} />)}
                </div>
            </div>
        </main>
    )
}

const DayItem = ({ id, activeDay, setCurrentHour, setActiveDay, data, setCurrentDay, DAYS_WEEK, toCelsius, isCelsius, day, ICONS }) => {

    const dayClass = (activeDay == id) ? "bg-zinc-200 p-1 flex flex-col items-center rounded-md shadow-md cursor-pointer transition-colors" : "cursor-pointer bg-zinc-50 p-1 flex flex-col items-center rounded-md shadow-md hover:bg-zinc-200 active:bg-zinc-100 transition-colors"

    return (
        <div
            onClick={() => {
                setActiveDay(id);
                setCurrentDay(data?.days[id]);
                setCurrentHour(data?.days[id]?.hours[13]);
            }}
            className={dayClass}
        >
            <img className="w-8 h-8" src={ICONS[day?.icon]} alt="day icon" />
            <span className="text-zinc-700">
                {isCelsius ? (
                    <>{toCelsius(day?.temp)} &#176;C</>
                ) : (
                    <>{day?.temp} &#176;F</>
                )}
            </span>
            <span className="text-zinc-400">
                {isCelsius ? (
                    <>{toCelsius(day?.feelslike)} &#176;C</>
                ) : (
                    <>{day?.feelslike} &#176;F</>
                )}
            </span>
            <span className="text-zinc-700">{DAYS_WEEK[new Date(day?.datetime).getDay()]}</span>
        </div>
    );
}

const CurrentDate = ({ day, hour, DAYS_WEEK }) => {
    let now = new Date(day?.datetime).getDay();

    return <span className="text-zinc-400">{DAYS_WEEK[Number(now)]} {(hour?.datetime)?.slice(0, 5)}</span>;
}

export default Root;