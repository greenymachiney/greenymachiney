const axios = require('axios');
const key = require('../../config/keys').api.weather;

const getCurrentWeather = (lat, lon) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    .then((response) => console.log('line 7', response))
    .catch((err) => console.error('error in weather api call: ', err));
};

module.exports = {
  getCurrentWeather,
};

// const axios = require('axios');
// // const key = require('../../config/keys').yelp.APIkey;
// require('dotenv').config();

// const getBeerWineSpiritsStores = (location) => {
//   return axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=beer_and_wine`, {
//     headers: {
//       Authorization: `Bearer ${process.env.YELP_API_KEY}`
//     }
//   })
//   .then(response => response.data.businesses)
//   .catch(err => console.error('error in yelp api call: ', err));
// }

// module.exports = {
//   getBeerWineSpiritsStores,
// }