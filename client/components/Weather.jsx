import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState({});

  const getWeather = () => {
    axios
      .get(`/weather`)
      .then(({ data }) => {
        setWeather(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button
        onClick={getWeather}
        className="btn btn-success btn-sm"
        title="get weather"
      >
        Check Weather
      </button>
    </>
  );
};

export default Weather;
