const { Router } = require('express');
const youtubeRouter = Router();

const { youtubeRouter } = require('../api/getYoutube');

//sends location to weather api and responds with current weather
youtubeRouter.get('/youtube/:query', (req, res) => {
  const { query } = req.params;
  console.log('LINE 9: ', req.params); 
  youtubeRouter(query)
    .then((response) => res.status(200).send(response))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

module.exports = youtubeRouter