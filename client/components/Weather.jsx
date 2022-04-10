import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const key = require("../../config/keys").api.weather;

const Button = styled.button`
background-color: #3a4042;
color: #f5f5f5;
border: 1px solid #f5f5f5;
border-radius: 4px;
padding: 0.25em 1em;
margin: 1em;
font-size: 20px;
cursor: pointer;
`;

const Weather = ({ lat, lon }) => {
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [humid, setHumid] = useState();
  
  const handleWeatherClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
      )
      .then((response) => {
        setCity(response.data.name);
        setTemp(response.data.main.temp);
        setHumid(response.data.main.humidity);
        setWind(response.data.wind.speed);
      })
      .catch((error) => {
        console.error("ERROR: ", error);
      });
  };


  return (
    <>
      <Button
        onClick={handleWeatherClick}
        className="btn btn-weather btn-sm"
        title="get weather"
      >
        Check Weather
      </Button>
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

