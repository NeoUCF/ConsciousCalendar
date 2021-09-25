import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header.js';
import Footer from './Footer.js';
import Homepage from './Homepage.js';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <App text="Hello" />
        <Homepage />
        <Footer />
    </React.StrictMode>,
    document.getElementById('root')
);
