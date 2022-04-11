const { Router } = require('express');
const profileRouter = Router();
const { User } = require('../database');

profileRouter.get('/user', (req, res) => {
  // console.log(req.body)
  const { username } = req.user;

  User.findOne({ username })
    .then((user) => res.status(200).send(user))
    .catch(err => res.status(500).send(err))

})

profileRouter.get('/users', (req, res) => {
  User.find({ 'username': { $ne: req.user.username } })
    .then((users) => {
      const user = users.map(user => user.username)
      // console.log(user)
      res.status(200).send(user)
    })
    .catch((err) => res.status(500).send(err))
})

profileRouter.patch('/sendFriendRequest', (req, res) => {
  
  console.log(req.body.from, "req.body.from")


  User.findOne({ 'username': req.body.username })
    .then((requested) => {
      console.log('Requested persons obj',requested)
      if (!requested.friendRequests.includes(req.body.from)) {
        console.log('hit condition')
        User.findOneAndUpdate({ 'username': req.body.username }, { $push: { 'friendRequests': req.body.from } }, { new: true })
        .then(() => {
          res.sendStatus(201)
        })
      } else {
        res.sendStatus(500)
      }
      
    })
    .catch(err => console.error(err))
})

profileRouter.patch('/acceptFriendRequest', (req, res) => {
  const { username } = req.user;
  const { friendRequests } = req.body
  // console.log(friendRequests[0], "friend")

  User.findOneAndUpdate({ username }, { $pull: { 'friendRequests': { $in: friendRequests } } }, { new: true })
    .then(() => User.findOneAndUpdate({ username }, { $push: { 'friends': friendRequests[0] } }, { new: true }))
    .then(() => {
      res.sendStatus(201)
    })
})


module.exports = profileRouter;