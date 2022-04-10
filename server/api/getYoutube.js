const axios = require('axios');
require('dotenv').config();

const getYouTubeSearchResults = (query) => {
  return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=How%20to%20make%20a%20${query}&key=${process.env.YOUTUBE_API_KEY}`)
    .then((response) => console.log("FIRST YOUTUBE SEARCH RESULT: ", response.data.items[0]))
    .catch((err) => console.error(err));
};

module.exports = {
  getYouTubeSearchResults,
};