import { useState, useEffect } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { APP_ID, APP_KEY } from "../data/data";

const Root = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [location, setLocation] = useState({
        longitude: -0.12,
        latitude: 51.50,
    });
    // const url = `http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=65c6ca61&app_key=b465832dcef33b48be3c9380d4435a80`;
    const url = `http://api.weatherunlocked.com/api/forecast/${location.latitude},${location.longitude}?lang=ru&app_id=${APP_ID}&app_key=${APP_KEY}`;

    useEffect(() => {
        setIsLoading(true);

        fetch(url)
            .then(response => response.json())
            .then(text => setData(text.Days))
            // .then(d => console.log(d.Days))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [url]);

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
        <>
            <h1 className="text-purple-800 "> {isLoading ? "fff" : data[0].Timeframes[0].date}</h1>
            <LineChart className="m-8" margin={{ top: 5, right: 20, bottom: 5, left: 0 }} width={600} height={300} data={data1}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="2 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </>
    )
}

export default Root;