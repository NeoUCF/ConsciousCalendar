import {
    addDays,
    differenceInCalendarDays,
    isSameDay,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import "./index.css";
import { EventObject } from "./EventObject";

const Calendar = () => {
    let day = startOfWeek(startOfMonth(new Date()));
    const lastCalendarDay = endOfWeek(endOfMonth(new Date()));
    const endDay = addDays(lastCalendarDay, 1); // This is to create an exclusive end date
    const totalDays = differenceInCalendarDays(lastCalendarDay, day) + 1; // +1 to add end date
    console.log(day, lastCalendarDay);
    console.log(totalDays);

    const calendar = [];
    let week = [];
    var eventArr = [];

    eventArr.push(new EventObject("h", "h", "h", 3));
    eventArr.push(new EventObject("h", "h", "h", 17));

    console.log("event is " + JSON.stringify(eventArr));

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

    function addEventListener(number) {
        console.log(number);
    }

    return (
        <div className="calendar">
            {calendar.map((week) => {
                return (
                    <div key={week[0]} className="weeks">
                        {week.map((day) => {
                            return (
                                <div
                                    key={day.getDate()}
                                    className="days"
                                    onClick={() => addEventListener(day.getDate())}
                                >
                                    {day.getDate()}
                                    {eventArr.map((post) => {
                                        if (post.time === day.getDate())
                                            return <h1>{post.title}</h1>;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Calendar;
