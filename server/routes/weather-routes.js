const { Router } = require('express');
const weatherRouter = Router();

const { getCurrentWeather } = require('../api/getWeather');


//sends location to weather api and responds with current weather
weatherRouter.get('/weather/:name', (req, res) => {
  const { name } = req.params;
  // console.log('LINE 10: ', req.params); //returns { name: New Orleans }
  getCurrentWeather(name)
    // console.log('LINE 11', name) //returns 29, -91 from postman
    .then((response) => {
      res.status(200).send(response)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

module.exports = weatherRouter