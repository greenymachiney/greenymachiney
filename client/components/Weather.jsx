import React, { useState, useEffect } from "react";
import axios from "axios";
// import WeatherCard from './components/WeatherCard.jsx';
const key = require('../../config/keys').api.weather;



const Weather = () => {
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) { //returns lat/lon based on user location
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
      .then(response => console.log('LINE 19', response.data))
      .catch(error => { console.error('LINE 25: ', error);
      })
  }, [lat, lon]);

  // const getWeather = (coord) => {
  //   axios.get('/weather/:lat/:lon', {
  //     params: { lat: coord.lat, lon: coord.lon }
  //   })
  //   .then((response) => {
  //     console.log('LINE 30', response);
  //     setWeather(response.data);
  //   })
  //   .catch((err) => {
  //     console.error('ERROR!! ', err);
  //   })
  // }

  return (
    <>
      <button
        onClick={() => weather}
        className="btn btn-weather btn-sm"
        title="get weather"
      >
        Check Weather
      </button>
    </>
  );
};

export default Weather;
