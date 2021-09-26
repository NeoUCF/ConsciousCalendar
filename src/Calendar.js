import {
    addDays,
    addMonths,
    differenceInCalendarDays,
    isSameDay,
    endOfMonth,
    endOfWeek,
    startOfMonth,
    startOfWeek,
    getMonth,
    isToday,
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
import App from './App';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';




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

const Calendar = (props) => {
      
    const [openOne, setOpenOne] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, onChange] = useState('10:00');
    const [monthAdd, setMonthAdd] = useState(0);

    const handleOpen = () => {
        /*const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
          });
          
    
            const handleClickOpen = () => {
              setOpenOne(true);
            };
          
            const handleClickClose = () => {
              setOpenOne(false);
            };
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button>
        <Dialog
          open={openOne}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClickClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to create a new event? Increment weather has been detected on this day.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Disagree</Button>
            <Button onClick={handleClickClose}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>*/
      setOpen(true)
    
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
    const monthNumber = getMonth(today);
    const monthName = format(new Date(2000, monthNumber, 1), 'MMMM');
    console.log(day, lastCalendarDay);
    console.log(totalDays);

    const calendar = [];
    let week = [];
    var eventArr = [];

    eventArr.push(new EventObject("h", "h", "h", 3));
    eventArr.push(new EventObject("h", "h", "h", 17));

    console.log("event is " + JSON.stringify(eventArr));

    var daysIcon={}

    for (let counter = 1; !isSameDay(day, endDay); counter++) {
        week.push(day);
        console.log("istoday=",isToday(day))
        console.log("day=",day)

        //if day == date.today, start printing 
        if(isToday(day)){
            daysIcon[day]=props.icons[0];
            for(let i=1;i<7;i++){
            daysIcon[addDays(day, i)]=props.icons[i];
            }
        }

        day = addDays(day, 1);

        if (counter === 7) {
            calendar.push(week);
            console.log("calendar=",calendar)
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
                {monthName}, 
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
                                        className="days"
                                        onClick={handleOpen}
                                    >
                                       
                                        {day.getDate()}
                                        {eventArr.map((post) => {
                                            if (post.time === day.getDate())
                                                <h1 key={post}>&nbsp;{post.title}</h1>
                                                        
                                        })}
                                    <div className="images">
                                    {daysIcon[day]!==undefined && <img src={daysIcon[day]} alt="" height="40px" width="40px" onerror="this.style.display='none'"></img>}
                                    </div>
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
