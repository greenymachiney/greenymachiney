const { Router } = require('express');
const profileRouter = Router();
const { User } = require('../database');

profileRouter.get('/user', (req, res) => {
  console.log(req.user)
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => res.status(200).send(user))
    .catch(err => res.status(500).send(err))
  
})

profileRouter.get('/users', (req,res) => {
  User.find({ 'username': {$ne : req.user.username} })
    .then((users) => {
      const user = users.map(user => user.username)
      console.log(user)
      res.status(200).send(user)
    })
    .catch((err) => res.status(500).send(err))
})



module.exports = profileRouter;