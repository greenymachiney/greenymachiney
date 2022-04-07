const axios = require('axios');
const key = require('../../config/keys').api.weather;

const getCurrentWeather = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    .then((response) => console.log('line 7 ', response))
    .catch((err) => console.error('error in weather api call: ', err));
};

module.exports = {
  getCurrentWeather,
};

