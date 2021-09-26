const express=require("express");
const app=express()
const cors=require("cors");

// Require Mongoose
const mongoose = require('mongoose');
require("dotenv").config();

console.log("WORKING")
console.log(process.env.WEATHER_KEY);

// Connect to database
mongoose.connect(process.env.REACT_APP_MONGODB_SRV
    ,{useNewUrlParser: true,
    useUnifiedTopology: true,
    userFindAndModify: false,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err);
});
