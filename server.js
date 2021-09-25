const express=require("express");
const app=express()
const cors=require("cors");

// Require Mongoose
const mongoose = require('mongoose');
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGODB_SRV
    ,{useNewUrlParser: true,
    useUnifiedTopology: true,
    userFindAndModify: false,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err);
});
