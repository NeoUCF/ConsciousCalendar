import { lightBlue } from '@mui/material/colors';
import styled from 'styled-components'

const Homepage = () => {

  return (

    <div id="main-container">
      <div><h1 id="site-title">Conscious Calendar</h1></div>

      <div>
        <img id="calendar-image" src="image/calendar.png" alt="calendar" />
        <img id="sunny-image" src="image/sunny.png" alt="sunny" />
        <img id="weather-image" src="image/weather.png" alt="weather" />

        <button onclick="scrollFunction()" id="button"><a href="#needforbutton">
          Start Planning Now</a>
        </button>

      </div> 

    </div>

  );
};

export default Homepage;