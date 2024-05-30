import { useState, useEffect } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { API_KEY, ICONS, DAYS_WEEK } from "../data/data";

const Root = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    // const [location, setLocation] = useState({
    //     longitude: 30.18,
    //     latitude: 59.56,
    // });

    const [isCelsius, setIsCelisius] = useState(true);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.9697,-77.385?key=${API_KEY}&lang=ru`;

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(
                (json) => console.log(json),
                (err) => console.log(err))
    }, []);

    const data1 = [
        { name: 'Page A', uv: 400 },
        { name: 'Page B', uv: 1200 },
        { name: 'Page C', uv: 1100 },
        { name: 'Page D', uv: 850 },
        { name: 'Page E', uv: 2200 },
        { name: 'Page F', uv: 1200 },
        { name: 'Page G', uv: 2200 },
    ];

    return (
        <main className="w-4/5 mx-auto my-12">
            <div className="flex items-center justify-between">

                <div className="flex gap-4 items-center">
                    {/* <img src={ICONS.get(currentFrame.wx_code)} className="w-20 h-20" alt="weather icon" /> */}
                    <div className="flex items-start">
                        <span className="text-8xl text-zinc-800">
                            {
                                isCelsius ? (
                                    12
                                ) : (
                                    34
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
                            <span className="text-sm text-zinc-400">Вероятность осадков: 0 %</span>
                            <span className="text-sm text-zinc-400">Влажность: 0 %</span>
                            <span className="text-sm text-zinc-400">Ветер: 0 м/с</span>
                        </div>
                    </div>

                </div>

                <div className="flex self-start mt-3 items-end flex-col">
                    <span>Погода</span>
                    <CurrentDate />
                    <span>описание</span>
                </div>
            </div>
            <LineChart className="m-8" margin={{ top: 5, right: 20, bottom: 5, left: 0 }} width={600} height={300} data={data1}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </main>
    )
}

const CurrentDate = () => {
    let now = new Date();

    return <span>{DAYS_WEEK[now.getDay()]} {now.getHours()}:{now.getMinutes()}</span>;
}

export default Root;