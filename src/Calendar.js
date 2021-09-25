import {
    addDays,
    differenceInCalendarDays,
    isSameDay,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import './index.css';

const Calendar = () => {
    let day = startOfWeek(startOfMonth(new Date()));
    const lastCalendarDay = endOfWeek(endOfMonth(new Date()));
    const endDay = addDays(lastCalendarDay, 1); // This is to create an exclusive end date
    const totalDays = differenceInCalendarDays(lastCalendarDay, day) + 1; // +1 to add end date
    console.log(day, lastCalendarDay);
    console.log(totalDays);

    const calendar = [];
    let week = [];

    for (let counter = 1; !isSameDay(day, endDay); counter++) {

        week.push(day);
        day = addDays(day, 1);

        if (counter === 7) {
            calendar.push(week);
            week = [];
            counter = 0;
        }
    }

    console.log(calendar);

    return (
        <div className="calendar">
            {
                calendar.map((week) => {
                    return (
                        <div key={week[0]} className="weeks">
                            {
                                week.map(day => {
                                    return (
                                        <div key={day.getDate()} className="days">
                                            {day.getDate()}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Calendar;