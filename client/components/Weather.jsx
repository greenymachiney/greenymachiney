import React, { useState, useEffect } from "react";
import axios from "axios";
const key = require('../../config/keys').api.weather;


const Weather = ({lat, lon}) => {
  // const [lat, setLat] = useState();
  // const [lon, setLon] = useState();
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [feels, setFeels] = useState();
  const [main, setMain] = useState();
  const [description, setDescription] = useState();


  const handleWeatherClick = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    .then(response => {
      setCity(response.data.name)
      setTemp(response.data.main.temp)
      setFeels(response.data.main.feels_like)
      setMain(response.data.weather[0].main)
      setDescription(response.data.weather[0].description)
    })
    .catch(error => { console.error('LINE 20: ', error);
  })
  
}

// useEffect(() => {
//     navigator.geolocation.getCurrentPosition(function(position) { //returns lat/lon based on user location
//       setLat(position.coords.latitude + .000001);
//       setLon(position.coords.longitude + .000001);
//     });
//   }, []);

  return (
    <>
      <button
        onClick={handleWeatherClick}
        className="btn btn-weather btn-sm"
        title="get weather"
      >
        Check Weather
      </button>
    {
      !temp ? null :  (
      <>
      <div>Temp: {temp}</div>
      <div>City: {city}</div>
      <div>Feels Like: {feels}</div>
      <div>It's a {main} day with a {description}</div>
      </>
      )
    }
    </>
  );
};

export default Weather;
