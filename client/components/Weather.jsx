import React, { useState, useEffect } from "react";
import axios from "axios";
const key = require("../../config/keys").api.weather;

const Weather = ({ lat, lon }) => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [feels, setFeels] = useState();
  const [wind, setWind] = useState();
  const [humid, setHumid] = useState();
  const [description, setDescription] = useState();

  const handleWeatherClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
      )
      .then((response) => {
        setCity(response.data.name);
        setTemp(response.data.main.temp);
        setFeels(response.data.main.feels_like);
        setHumid(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setDescription(response.data.weather[0].description);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
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
      {!temp ? null : (
        <>
          <div id="weather_wrapper">
            <div className="weatherCard">
              <div className="currentTemp">
                <span className="temp">{Math.floor(temp)}°</span>
                <span className="location">{city}</span>
              </div>
              <div className="currentWeather">
                <span className="conditions">
                &#xf00d;
                </span>
                <div className="info">
                  <span className="rain">{humid}%</span>
                  <span className="wind">{wind} mph</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Weather;

<div id="weather_wrapper">
  <div class="weatherCard">
    <div class="currentTemp">
      <span class="temp">23&deg;</span>
      <span class="location">Brussels</span>
    </div>
    <div class="currentWeather">
      <span class="conditions">&#xf00d;</span>
      <div class="info">
        <span class="rain">1.3 MM</span>
        <span class="wind">10 MPH</span>
      </div>
    </div>
  </div>
</div>;
