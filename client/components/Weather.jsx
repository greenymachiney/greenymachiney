import React, { useState, useEffect } from "react";
import axios from "axios";
const key = require('../../config/keys').api.weather;


const Weather = ({lat, lon}) => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [feels, setFeels] = useState();
  const [main, setMain] = useState();
  const [humid, setHumid] = useState();
  const [description, setDescription] = useState();


  const handleWeatherClick = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    .then(response => {
      setCity(response.data.name)
      setTemp(response.data.main.temp)
      setFeels(response.data.main.feels_like)
      setHumid(response.data.main.humidity)
      setMain(response.data.weather[0].main)
      setDescription(response.data.weather[0].description)
    })
    .catch(error => { console.error('ERROR: ', error);
  })
};

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
      <div className='list-group-item'>
      <div>City: {city}</div>
      <div>Temperature: {temp}°</div>
      <div>Feels Like: {feels}°</div>
      <div>Humidity: {humid}%</div>
      <div>It's {main} outside with a {description}</div>
      </div>
      </>
      )
    }
    </>
  );
};

export default Weather;
