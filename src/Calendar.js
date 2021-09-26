import {
    addDays,
    addMonths,
    differenceInCalendarDays,
    isSameDay,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import "./index.css";
import { EventObject } from "./EventObject";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TimePicker from 'react-time-picker';
import format from "date-fns/format/index";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const style = {
    textAlign: "center",
    borderRadius: "40px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Calendar = () => {
    const [open, setOpen] = React.useState(false);
    const [value, onChange] = useState('10:00');
    const [monthAdd, setMonthAdd] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let today = new Date();
    today = addMonths(today, monthAdd);
    let day = startOfWeek(startOfMonth(today));
    const lastCalendarDay = endOfWeek(endOfMonth(today));
    const endDay = addDays(lastCalendarDay, 1); // This is to create an exclusive end date
    const totalDays = differenceInCalendarDays(lastCalendarDay, day) + 1; // +1 to add end date
    const monthName = format(today, 'MMMM');
    const year = format(today, 'yyyy');
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

    function printStuff() {
        console.log(value)
    }

    function changeMonth(value) {
        console.log("Hooray", value);
        setMonthAdd(value);
    }

    return (
        <React.Fragment>
            <div>
                <Button style={{width: "40%"}} variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => changeMonth(monthAdd-1)}/>
                {monthName}, {year}
                <Button style={{width: "40%"}} variant="text" startIcon={<ArrowForwardIosIcon />} onClick={() => changeMonth(monthAdd+1)}/>

            </div>
            <DaysOfTheWeek />
            <div className="calendar">
                {calendar.map((week) => {
                    return (
                        <div key={week[0]} className="weeks">
                            {week.map((day) => {
                                return (
                                    <div
                                        key={day.getDate()}
                                        className={(monthName === format(day, "MMMM")) ? "days" : "other"}
                                        onClick={handleOpen}
                                    >
                                        {day.getDate()}
                                        {eventArr.map((post) => {
                                            if (post.time === day.getDate())
                                                return <h1 key={post}>{post.title}</h1>;
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form>
                            <p>Event title</p>
                            <input type="text" />

                            <p>Event description</p>
                            <input type="text" />

                            <p>Event address</p>
                            <input type="text" />

                            <p>Event start time</p>
                            <TimePicker closeClock={true} onChange={onChange} value={value}/>

                            <p>Event start end</p>

                            <Button variant="outlined" onClick={() => printStuff()}>
                                Click me hehe
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </div>
        </React.Fragment>
    );
};

const DaysOfTheWeek = () => {
    const DoTW = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return (
        <div className="">
            {DoTW.map((day) => {
                return (
                    <div key={day} className="DoTW">
                        {day}
                    </div>
                );
            })}
        </div>
    );
    // return (
    //     <div className="dayList">
    //         {DoTW.map((day) => {
    //             return (
    //                 <div className="dayName">
    //                   {day}
    //                 </div>
    //             )
    //         })}
    //     </div>
    // );
};

export default Calendar;
