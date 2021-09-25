import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Require Mongoose
// const mongoose = require('mongoose');
require("dotenv").config();

// mongoose.connect(process.env.MONGODB_SRV, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     userFindandModify: false
// }).then(()=>{
//     console.log("Connected to db!");
// }).catch((err)=>{
//     console.log(err);
// });

ReactDOM.render(
    <React.StrictMode>
        <App text="Hello" />
        <App text="World!" />
    </React.StrictMode>,
    document.getElementById('root')
);
