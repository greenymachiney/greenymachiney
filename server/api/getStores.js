const axios = require('axios');
// const key = require('../../config/keys').yelp.APIkey;
require('dotenv').config();

const getBeerWineSpiritsStores = (location) => {
  return axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=beer_and_wine`, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  })
  .then(response => response.data.businesses)
  .catch(err => console.error('error in yelp api call: ', err));
}

module.exports = {
  getBeerWineSpiritsStores,
}