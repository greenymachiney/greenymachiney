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
      .then(res => res)
      .then(result => {
        setWeather(result.data);
        console.log('LINE 25: ', result.data); //returns object of current weather data from geolocation lat/lon
      })
  }, [lat, lon]);

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
