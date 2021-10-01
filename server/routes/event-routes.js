const { Router } = require('express');
const eventRouter = Router();

const { User } = require('../database');


//get request for events
eventRouter.get('/', (req, res) => {
  const { username } = req.user;
  User.findOne({ username })
  .then(user => {
    res.status(200).send(user.events);
  })
  .catch(err => res.sendStatus(404));
})

//get users to invite
eventRouter.get('/invites', (req, res) => {
  const { username } = req.user;
  User.find( { username : {
    $ne: username
  }})
  .then(users => {
    console.log(users);
    if(users) {
      res.status(200).send(users);
    } else {
      res.status(200).send([]);
    }
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(404);
  })

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

//add friend
eventRouter.post('/addFriend', (req, res) => {
  const { friend, event } = req.body.data;
  const { username } = req.user
  console.log(req.body);
  console.log('FRIEND: ', friend);
  console.log('EVENT: ', event);

  const getEventObj = (arrOfEvents) => {
    for (let i = 0; i < arrOfEvents.length; i++) {
      if (arrOfEvents[i].eventName === event) {
        if (!arrOfEvents[i].friends.includes(friend)) {
          arrOfEvents[i].friends.push(friend); //friend is added
        }
      }
    }
    console.log('updated events arr: ', arrOfEvents);
    return arrOfEvents; //return whole arr
  }
  
  User.findOne({ username })
    .then(user => {
      User.updateOne({ username }, {
        $set: {
          events: getEventObj(user.events)
        }
      })
      .then(() => {
        res.sendStatus(200);
      })
    })
    .catch(err => res.sendStatus(404));
})


module.exports = eventRouter;
