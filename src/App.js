import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './Calendar';
require("dotenv").config();
var cityName = "Orlando";
var icons=[]

function App(props) {
    const [item, setItem] = useState([]);
    const [isDone, setIsDone] = useState(false);


    useEffect(() => {
        const secret = process.env.REACT_APP_WEATHER_KEY;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + cityName + `&appid=` + secret + `&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    const temp = (result);
                    let longitude = temp.coord.lon;
                    console.log(longitude)
                    let latitude = temp.coord.lat;
                    console.log(latitude)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=` + latitude + `&lon=` + longitude + `&appid=` + secret)
                        .then(res => res.json())
                        .then(
                            (result) => { 
                                setItem(result);
                                setIsDone(true);
                             },
                            (error) => { console.log(error) }
                        )


                },
                (error) => { console.log(error) }
            );
    }, []);

    if(isDone){
        console.log(item); //our weather item is here

        var dailyWeather=[];
        dailyWeather.push({dt: item.current.dt, temp: item.current.temp, id: item.current.weather[0].id, description: item.current.weather[0].description, icon: item.current.weather[0].icon})
    
        for (let i = 1; i < 7; i++) {
            dailyWeather.push({dt: item.daily[i].dt, temp: item.daily[i].temp.day, id: item.daily[i].weather[0].id, description: item.daily[i].weather[0].description, icon: item.daily[i].weather[0].icon})
          }

        //dailyweather now contains the weather data for all the days
        for(let i=0;i<7;i++){
            // fetch weather icons for 7 days
            console.log(dailyWeather[0]);
             var iconURL="https://openweathermap.org/img/wn/"+dailyWeather[i].icon+"@2x.png"
             icons.push(iconURL)

    
        }

    }

    

    return (
        <div className="App">
            <header className="App-header">
            <img src={icons[0]} alt="weathericon"/>
                <br/>
                <Calendar icons={icons} daily={dailyWeather} />
                <br /><br /><br />
            </header>

        </div>
    );
}

export default App;
