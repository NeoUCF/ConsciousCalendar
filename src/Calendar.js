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
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Calendar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
      <div className="tab">
        {/* <DaysOfTheWeek /> */}
        Sun &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Mon &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp;&nbsp;Tues &nbsp; &nbsp; &nbsp; &nbsp; Weds &nbsp; &nbsp;
        &nbsp; &nbsp; Thurs &nbsp; &nbsp; &nbsp; &nbsp; Fri &nbsp; &nbsp; &nbsp;
        &nbsp; Sat &nbsp; &nbsp; &nbsp; &nbsp; Sun
      </div>
      {calendar.map((week) => {
        return (
          <div key={week[0]} className="weeks">
            {week.map((day) => {
              return (
                <div key={day.getDate()} className="days" onClick={handleOpen}>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <p>event title</p>
            <input type="text" />

            <p>event date</p>
            <input type="date" />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const DaysOfTheWeek = () => {
  const DoTW = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"];

  return (
    <div className="weeks">
      {DoTW.map((day) => {
        return day;
      })}
    </div>
  );
};

export default Calendar;
