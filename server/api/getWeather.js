const axios = require('axios');
const key = require('../../config/keys').api.weather;

const getCurrentWeather = (name) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=imperial`)
    .then((response) => console.log('WEATHER API', response.data)) //returns data object of current weather conditions based on city;
    .catch((err) => console.error('error in weather api call: ', err));
};

module.exports = {
  getCurrentWeather,
};

