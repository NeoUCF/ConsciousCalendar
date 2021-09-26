import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './Calendar';
require("dotenv").config();

function App(props) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const secret = process.env.REACT_APP_WEATHER_KEY;
        fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid="+secret+"&units=metric")
            .then(res => res.json())
            .then(
                (result) => { setItem(result) },
                (error) => { console.log(error) }
            );
    }, []);

    console.log(item);
    return (
        <div className="App">
            <header className="App-header">
                <div id="needforbutton">Hello!</div>
                <Calendar />
                <br /><br /><br />
            </header>
            
        </div>
    );
}

export default App;
