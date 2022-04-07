import React, { useState, useEffect } from "react";
import axios from "axios";
const key = require('../../config/keys').api.weather;


const Weather = () => {
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const getWeather = () => {

  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
        // console.log("Latitude is:", lat)
        // console.log("Longitude is:", long)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
      .then(res => res)
      .then(result => {
        result;
        console.log('LINE 25: ', result); //returns object of current weather data from geolocation lat/lon
      })
  }, [lat, lon]);

  return (
    <>
      <button
        onClick={getWeather}
        className="btn btn-weather btn-sm"
        title="get weather"
      >
        Check Weather
      </button>
    </>
  );
};

export default Weather;
