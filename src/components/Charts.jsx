import { LineChart, Line, AreaChart, Area, BarChart, Bar, LabelList, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { toCelsius, milesPerHourToMetersPerMinute } from "../utils/supportFunctions";
import { WIND_DIR, WIND_ICONS, ICONS } from "../data/data";

export const DefaultAreaChart = ({ data, width, height, color, isCelsius, dataCondit, dataIcons }) => {
    const CustomAreaLabel = ({ x, y, value }) => {
        return (
            <text className="text-sm font-medium" x={x} y={y} dy={-10} fill={"#333"} fontSize={10} textAnchor="middle">
                {isCelsius ? (
                    <>{toCelsius(value)} &#176;C</>
                ) : (
                    <>{value} &#176;F</>
                )}

            </text>
        );
    }

    const getIcon = (time) => {
        const elem = dataIcons.find(elem => elem.name == time);
        return ICONS[elem.uv];
    }

    const getCondition = (time) => {
        const elem = dataCondit.find(elem => elem.name == time);
        return elem.uv;
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-50 p-1 rounded-md shadow-md flex gap-2 items-center">
                    <img className="w-8 h-8" src={getIcon(label)} alt="weather icon" />
                    <p>{getCondition(label)}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <AreaChart width={width} height={height} data={data} margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 0,
        }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor={color} stopOpacity={0.25} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" />
            <Area type="monotone" dataKey="uv" label={<CustomAreaLabel />} stroke={color} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    );
}

export const DefaultBarChart = ({ width, height, color, data, dataHumi }) => {
    const CustomBarLabel = ({ x, y, width, value }) => {
        return <text className="text-sm font-medium" x={x + width / 2} y={y} fill="#0492c2" textAnchor="middle" dy={-6}>
            {value} %
        </text>;
    }

    const getHumi = (time) => {
        let elem = dataHumi.find(elem => elem.name == time);
        return Math.round(elem.uv);
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-50 p-1 rounded-md shadow-md">
                    {/* <img className="w-8 h-8" src={getIcon(label)} alt="weather icon" /> */}
                    <p>Влажность: {getHumi(label)} %</p>
                </div>
            );
        }

        return null;
    };

    return (
        <BarChart width={width} height={height} data={data} margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 0,
        }}>
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="uv" barSize={30} fill={color} fillOpacity={0.25} stroke={color} strokeOpacity={0.7} strokeWidth={2}
                label={<CustomBarLabel />} />
        </BarChart>
    );

}

export const DefaulWindChart = ({ width, height, data, color, dataWindDir }) => {
    const CustomWindLabel = ({ x, y, value }) => {
        return (
            <text className="text-sm font-medium" x={x} y={y} dy={-10} fill={"#333"} fontSize={10} textAnchor="middle">
                {milesPerHourToMetersPerMinute(value)} м/с
            </text>
        );
    }

    const getDir = (dir) => {
        let index = Math.round((dir / 45));
        return (index === 9) ? 0 : index;
    }

    const GetWindDir = ({ time }) => {
        let elem = dataWindDir.find(elem => elem.name == time);
        return (
            <div className="flex gap-2 items-center justify-center">
                <span>{WIND_DIR[getDir(elem.uv)]}</span>
                <img src={WIND_ICONS[getDir(elem.uv)]} className="w-6 h-6" alt="wind direction" />
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-50 p-1 rounded-md shadow-md">
                    <GetWindDir time={label} />
                </div>
            );
        }

        return null;
    };

    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Line label={<CustomWindLabel />} type="monotone" dataKey="uv" stroke={color} />
        </LineChart>
    );
}

export const DefaultPressureChart = ({ width, height, data, color }) => {
    const CustomPressureLabel = ({ x, y, value }) => {
        return (
            <text className="text-sm font-medium" x={x} y={y} dy={-10} fill={"#03c04a"} fontSize={10} textAnchor="middle">
                {value} мм
            </text>
        );
    }

    return (
        <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 30,
                bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Line label={<CustomPressureLabel />} type="monotone" dataKey="uv" stroke={color} />
        </LineChart>
    );
}