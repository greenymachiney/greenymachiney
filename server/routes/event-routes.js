const { Router } = require('express');
const eventRouter = Router();

const { User } = require('../database');


//get request for events
eventRouter.get('/', (req, res) => {
  const { username } = req.user;
  User.findOne({ username })
  .then(event => {
    res.status(200).send(event.user.events);
  })
  .catch(err => res.sendStatus(404));
})


//post request
eventRouter.post('/addEvent', (req, res) => {
  const { event } = req.body
  const { username } = req.user
  User.updateOne({ username }, {
    $push: {
      events: event
    }
  })
  .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})

//delete request


module.exports = eventRouter;
