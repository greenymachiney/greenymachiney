const { Router } = require('express');
const eventRouter = Router();

const { User } = require('../database');


eventRouter.post('/addEvent', (req, res) => {
  const { event } = req.body
  console.log(event)
  res.sendStatus(200)
})

module.exports = eventRouter;
