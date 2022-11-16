const getDateFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = date.toUTCString()
    return date;
};

const getDateDayFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = String(date.getDate());

    if (date.length === 1) {
        return `0${date}`;
    } else {
        return date;
    };
};

const getYearFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = date.getFullYear();
    return date;
};

const getMonthFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = String(date.getMonth() + 1); // + 1 ---> getMonth() is 0 indexed... e.g., July is 6

    if (date.length === 1) {
        return `0${date}`;
    } else {
        return date;
    };
};

const getHourFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = String(date.getHours());

    if (date.length === 1) {
        return `0${date}`;
    } else {
        return date;
    };
};

const getMinutesFromIso8601 = (timestamp) => {
    let date = new Date(timestamp);
    date = String(date.getMinutes());

    if (date.length === 1) {
        return `0${date}`;
    } else {
        return date;
    };
};

export { getDateFromIso8601, getDateDayFromIso8601, getMonthFromIso8601, getYearFromIso8601, getHourFromIso8601, getMinutesFromIso8601 };
