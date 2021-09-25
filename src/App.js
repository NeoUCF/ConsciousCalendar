import { useEffect, useState } from 'react';
import './App.css';
require("dotenv").config();

function App(props) {
    const [item, setItem] = useState([]);

    useEffect(() => {
        const secret = process.env.WEATHER_KEY;
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
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <p>{props.text}</p>
                {/* <p>{item}</p> */}
            </header>
        </div>
    );
}

export default App;
