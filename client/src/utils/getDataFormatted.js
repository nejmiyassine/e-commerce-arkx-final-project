export function getDataFormatted(
    dataToHandle,
    dataByDay,
    data7Days,
    data14Days,
    labels,
    today,
    daysOfWeek
) {
    dataToHandle.forEach((data) => {
        const createdAtDate = new Date(data.order_date);
        const dayKey = createdAtDate.toISOString().split('T')[0];
        if (!dataByDay[dayKey]) {
            dataByDay[dayKey] = [];
        }

        dataByDay[dayKey].push(data);
    });

    for (let i = 0; i < 7; i++) {
        const dateKey = new Date(today - i * 24 * 60 * 60 * 1000);
        const dayOfWeekIndex = dateKey.getDay();
        const dayName = daysOfWeek[dayOfWeekIndex];

        const formattedDayKey = dateKey.toISOString().split('T')[0];
        labels.push(dayName);
        if (dataByDay[formattedDayKey]) {
            data7Days.push(dataByDay[formattedDayKey].length);
        } else {
            data7Days.push(0);
        }
    }

    for (let i = 7; i < 14; i++) {
        const dateKey = new Date(today - i * 24 * 60 * 60 * 1000);
        const formattedDayKey = dateKey.toISOString().split('T')[0];
        if (dataByDay[formattedDayKey]) {
            data14Days.push(dataByDay[formattedDayKey].length);
        } else {
            data14Days.push(0);
        }
    }
}
