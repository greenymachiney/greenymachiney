const axios = require('axios');
require('dotenv').config();


const getCurrentWeather = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=imperial`)
    .then((response) => response.data) //returns data object of current weather conditions
    .catch((err) => console.error('error in weather api call: ', err));
};

module.exports = {
  getCurrentWeather,
};

