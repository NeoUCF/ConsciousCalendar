import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './Header.js';
import Footer from './Footer.js';

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <App text="Hello" />
        <Footer />
    </React.StrictMode>,
    document.getElementById('root')
);
