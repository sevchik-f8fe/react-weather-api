export const toCelsius = (f) => {
    return ((f - 32) * (5 / 9)).toFixed(1);
}

export const milesPerHourToMetersPerMinute = (milesPH) => {
    return (milesPH / 2.011).toFixed(1);
}

export const getData = (day, item) => {
    return day
        ?.map(hour => ({
            'name': hour?.datetime.slice(0, 5),
            'uv': hour[item]
        }))
        ?.filter((element, index) => index % 2 === 1);
}

export const getCurrentHour = () => {
    return Number(new Date().getHours());
}

export const milibarToMMRTST = (mb) => {
    return Math.round(mb * 0.750063755419211);
}

export const calculateDaylightDuration = (riseTime, setTime) => {
    const riseDate = new Date(`1970-01-01T${riseTime}Z`);
    const setDate = new Date(`1970-01-01T${setTime}Z`);

    const durationMs = setDate - riseDate;

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} часов ${minutes} минут`;
}