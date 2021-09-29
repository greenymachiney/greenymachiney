const { Router } = require('express');
const shoppingRouter = Router();

const { User } = require('../database');

shoppingRouter.get('/', (req, res) => {
  const { username } = req.user;

  User.findOne({ username })
    .then(user => res.status(200).send(user.shoppinglist))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})

shoppingRouter.post('/addItem', (req, res) => {
  const { item } = req.body;
  const { username } = req.user;

  User.findOne({ username })
    .then(user => {
      if (!user.shoppinglist.includes(item)) {
        User.updateOne({ username }, {
          $push: {
            shoppinglist: item
          }
        })
          .then(() => res.sendStatus(201));
      } else {
        res.sendStatus(201);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    })
})


module.exports = shoppingRouter;