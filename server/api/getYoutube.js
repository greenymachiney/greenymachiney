const axios = require('axios');
require('dotenv').config();

const getYouTubeSearchResults = (query) => {
  console.log('LINE 5 getYoutube: ', query);
  return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=How%20to%20make%20a%20${query}&key=${process.env.YOUTUBE_API_KEY}`)
    .then((response) => response.data.items[0])
    .catch((err) => console.error(err));
};

module.exports = {
  getYouTubeSearchResults,
};