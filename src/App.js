import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Calendar from './Calendar';
require("dotenv").config();

function App(props) {
    const [item, setItem] = useState([]);
    const [isDone, setIsDone] = useState(0);
    const [cityName, setCityName] = useState("Orlando");
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const secret = process.env.REACT_APP_WEATHER_KEY;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + cityName + `&appid=` + secret + `&units=metric`)
            .then(res => res.json())
            .then(
                (result) => {
                    const temp = (result);
                    if (temp.coord === undefined)
                        return;
                    let longitude = temp.coord.lon;
                    console.log(longitude)
                    let latitude = temp.coord.lat;
                    console.log(latitude)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=` + latitude + `&lon=` + longitude + `&appid=` + secret)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                setItem(result);
                                setIsDone(isDone + 1);
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
             //

    
        }
    }

    const handleChange = (val) => {
        // console.log(e.target.textContent);
        // console.log(val);
        setCityName(val);
    }

    return (
        <div className="App">
            <header className="App-header">
                <br />
                <Autocomplete
                    style={{ display: "inline-flex" }}
                    sx={{ width: 300 }}
                    options={city_names}
                    value={cityName}
                    autoHighlight
                    freeSolo
                    onChange={(event, newValue) => handleChange(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a City"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <br />
                {console.log(icons)}
                <img src={icons[0]} alt="weathericon" />
                <br />
                <Calendar icons={icons} daily={dailyWeather}/>
                <br /><br />
            </header>

        </div>
    );
}

const city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

export default App;