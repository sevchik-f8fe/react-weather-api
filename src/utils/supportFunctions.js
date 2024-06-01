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
        ?.filter((element, index) => index % 3 === 1);
}

export const getCurrentHour = () => {
    return Number(new Date().getHours());
}