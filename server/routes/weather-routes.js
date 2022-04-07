const { Router } = require('express');
const weatherRouter = Router();

const { getCurrentWeather } = require('../api/getWeather');


//sends location to weather api and responds with current weather
weatherRouter.get('/weather/:location', (req, res) => {
  console.log('line 9 weatherRoute', req.params)
  const { location } = req.params;
  getCurrentWeather(location)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})