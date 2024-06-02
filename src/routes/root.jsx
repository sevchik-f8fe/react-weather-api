import { useState, useEffect, useContext } from "react";

import { toCelsius, milesPerHourToMetersPerMinute, getCurrentHour, getData, calculateDaylightDuration } from "../utils/supportFunctions";
import { DefaultAreaChart, DefaultBarChart, DefaulWindChart, DefaultPressureChart } from "../components/Charts";
import { API_KEY, ICONS, SHORT_DAYS_WEEK, MOONPHASES, DAYS_WEEK } from "../data/data";

import locationIcon from "../assets/land-layer-location.svg";
import sunrise from "../assets/sun/sunrise.png";
import sunset from "../assets/sun/sunset.png";
import sunEnergy from "../assets/sun/sun-energy.png"

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
    const [query, setQuery] = useState('Moscow');
    const [value, setValue] = useState('');

    const [isCelsius, setIsCelisius] = useState(true);
    const [currentHour, setCurrentHour] = useState({});
    const [activeDay, setActiveDay] = useState(0);
    const [activeChart, setActiveChart] = useState({
        temp: true,
        precip: false,
        wind: false,
        pres: false,
    });

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=${API_KEY}&lang=ru`;

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
            {isLoading ? (
                <div className="h-screen flex justify-center">
                    <div className="border-b-2 mt-20 animate-spin border-pink-300 rounded-full h-20 w-20"></div>
                </div>
            ) : (
                <>
                    <SearchContainer value={value} setValue={setValue} setQuery={setQuery} setLocation={setLocation} />

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
                            <span className="text-xl text-zinc-800 max-w-96 text-right">{data?.resolvedAddress}</span>
                            <CurrentDate DAYS_WEEK={DAYS_WEEK} day={currentDay} hour={currentHour} />
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
                            <DefaultAreaChart isCelsius={isCelsius} dataIcons={getData(currentDay.hours, 'icon')} dataCondit={getData(currentDay.hours, 'conditions')} color="#FFEF00" width={1140} height={280} data={getData(currentDay.hours, 'temp')} />
                        ) : activeChart.precip ?
                            (
                                <DefaultBarChart color="#0492c2" width={1140} height={280} dataHumi={getData(currentDay.hours, 'humidity')} data={getData(currentDay.hours, 'precipprob')} />
                            ) : activeChart.wind ? (
                                <DefaulWindChart color="#444444" width={1140} height={280} dataWindDir={getData(currentDay.hours, 'winddir')} data={getData(currentDay.hours, 'windspeed')} />
                            ) : (
                                <DefaultPressureChart color="#03c04a" width={1140} height={280} data={getData(currentDay.hours, 'pressure')} />
                            )
                        }

                        <div className="flex gap-2 my-4 pl-6">
                            {data?.days?.map((day, id) => <DayItem setCurrentHour={setCurrentHour} activeDay={activeDay} setActiveDay={setActiveDay} DAYS_WEEK={SHORT_DAYS_WEEK} data={data} day={day} toCelsius={toCelsius} isCelsius={isCelsius} setCurrentDay={setCurrentDay} key={day?.datetimeEpoch} ICONS={ICONS} id={id} />)}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6 auto-rows-min">
                        <MoonPhaseContainer currentDay={currentDay} />
                        <SolarEnergyContainer currentDay={currentDay} />
                        {/* <MoonPhaseContainer currentDay={currentDay} /> */}
                        {/* <MoonPhaseContainer currentDay={currentDay} /> */}
                    </div>
                </>
            )}
        </main>
    )
}

const SolarEnergyContainer = ({ currentDay }) => {
    let bgClass = (currentDay?.uvindex <= 4) ? "bg-green-400" : (
        currentDay?.uvindex <= 7 ? "bg-orange-400" : "bg-red-500"
    );

    return (
        <div className="bg-zinc-50 p-2 flex rounded-xl shadow-md">
            <img className="w-12 h-12" src={sunEnergy} alt="sun-energy icon" />

            <div className="flex flex-grow flex-col text-sm text-zinc-600 justify-around ">
                <div className="flex-col items-center gap-6">
                    <span className="inline-block">Солнечное излучение: {currentDay?.solarradiation} Вт/м<sup>2</sup></span>
                    <span className="inline-block">Кол-во солнечной энергии за день: {currentDay?.solarenergy} МДж/м<sup>2</sup></span>
                </div>

                <span className="text-sm whitespace-nowrap text-zinc-600">УФ-индекс: <span className={`${bgClass} p-1 font-medium text-white rounded-md`}>{currentDay?.uvindex}</span></span>
                <div className="h-6 flex flex-row gap-1">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((elem, id) => {
                        return <span key={elem} className={id < currentDay?.uvindex ? `p-1 rounded-md border ${bgClass}` : "p-1 rounded-md border bg-zinc-200"}></span>
                    })}
                </div>
            </div>
        </div>
    );
}

const MoonPhaseContainer = ({ currentDay }) => {
    const MI = currentDay.moonphase;
    let elem;

    if (MI == 0) elem = MOONPHASES[0];
    else if (MI > 0 && MI < 0.25) elem = MOONPHASES[1];
    else if (MI == 0.25) elem = MOONPHASES[2];
    else if (MI > 0.25 && MI < 0.5) elem = MOONPHASES[3];
    else if (MI == 0.5) elem = MOONPHASES[4];
    else if (MI > 0.5 && MI < 0.75) elem = MOONPHASES[5];
    else if (MI == 0.75) elem = MOONPHASES[6];
    else elem = MOONPHASES[7];

    return (
        <div className="bg-zinc-50 p-2 rounded-xl shadow-md">

            <div className="flex gap-2 py-2 px-4 justify-between rounded-full border-2 border-amber-400">
                <div>
                    <img src={sunrise} className="h-8 w-8" alt="sunrise icon" />
                    <span className="text-zinc-700">{(currentDay?.sunrise)?.slice(0, 5)}</span>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <span className="text-sm text-zinc-600">Световой день</span>
                    <span className="text-sm text-zinc-600">{calculateDaylightDuration(currentDay?.sunrise, currentDay?.sunset)}</span>
                </div>

                <div>
                    <img src={sunset} className="h-8 w-8" alt="sunset icon" />
                    <span className="text-zinc-700">{(currentDay?.sunset)?.slice(0, 5)}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <img className="h-8 w-8" src={elem.icon} alt="moon phase icon" />
                <span className="text-zinc-900 font-medium">{elem.name}</span>
            </div>
        </div>
    );
}

const SearchContainer = ({ value, setQuery, setValue }) => {

    const onSetPosition = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setQuery(`${position.coords.latitude},${position.coords.longitude}`);
            });
        } else {
            alert("Sorry ")
        }
    }

    window.onkeydown = (e) => {
        if (e.key == 'Enter' && value.length > 0) setQuery(value);
    }

    return (
        <div className="flex border-t border-b py-4 my-8 justify-between items-center">
            <div className="relative min-w-96">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-pink-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="search" id="default-search" className="block outline-none w-full p-3 pl-10 text-md text-zinc-900 border border-pink-400 rounded-lg " placeholder="Чернобыль..." required />
                <button onClick={() => setQuery(value)} type="button" className="text-white select-none absolute end-1.5 bottom-2 bg-pink-400 hover:bg-pink-500 outline-none active:bg-pink-300 transition-all font-medium rounded-lg text-sm px-2 py-2">Поиск</button>
            </div>

            <button onClick={onSetPosition} className="bg-pink-50 p-1 rounded-md hover:bg-pink-200 hover:scale-105 active:scale-95 transition-all">
                <img src={locationIcon} className="h-6 select-none w-6" alt="use geolocation" />
            </button>
        </div>
    )
        ;
}

const DayItem = ({ id, activeDay, setActiveDay, data, setCurrentDay, DAYS_WEEK, toCelsius, isCelsius, day, ICONS }) => {

    const dayClass = (activeDay == id) ? "bg-zinc-200 py-1 px-2 flex flex-col items-center rounded-md shadow-md cursor-pointer transition-colors" : "cursor-pointer bg-zinc-50 py-1 px-2 flex flex-col items-center rounded-md shadow-md hover:bg-zinc-200 active:bg-zinc-100 transition-colors"

    return (
        <div
            onClick={() => {
                setActiveDay(id);
                setCurrentDay(data?.days[id]);
            }}
            className={dayClass}
        >
            <span className="text-zinc-700">{DAYS_WEEK[new Date(day?.datetime).getDay()]}</span>
            <img className="w-8 h-8" src={ICONS[day?.icon]} alt="day icon" />
            <span className="text-zinc-700">
                {isCelsius ? (
                    <>{toCelsius(day?.temp)} &#176;C</>
                ) : (
                    <>{day?.temp} &#176;F</>
                )}
            </span>
            {/* <span className="text-zinc-400">
                {isCelsius ? (
                    <>{toCelsius(day?.feelslike)} &#176;C</>
                ) : (
                    <>{day?.feelslike} &#176;F</>
                )}
            </span> */}
        </div>
    );
}

const CurrentDate = ({ day, hour, DAYS_WEEK }) => {
    let now = new Date(day?.datetime).getDay();

    return <span className="text-zinc-400">{DAYS_WEEK[Number(now)]} {(hour?.datetime)?.slice(0, 5)}</span>;
}

export default Root;