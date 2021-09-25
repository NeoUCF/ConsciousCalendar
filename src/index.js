import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App text="Hello" />
        <App text="World!" />
    </React.StrictMode>,
    document.getElementById('root')
);
