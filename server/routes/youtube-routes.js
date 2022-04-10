const { Router } = require('express');
const youtubeRouter = Router();

const { getYouTubeSearchResults } = require('../api/getYoutube');

//sends location to weather api and responds with current weather
youtubeRouter.get('/:query', (req, res) => {
  const { query } = req.params;
  // console.log('LINE 9 youtube-routes: ', query); 
  getYouTubeSearchResults(query)
    .then((response) => res.status(200).send(response))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

module.exports = youtubeRouter