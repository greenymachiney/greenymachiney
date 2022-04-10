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
  
  User.findOne({ 'username': req.body.username })
    .then((data) => {
      if (!data.friendRequests.includes(req.body.from) && !data.friends.includes(req.body.from)) {
        User.findOneAndUpdate({ 'username': req.body.username }, { $push: { 'friendRequests': req.body.from } }, { new: true })

      }
    })
})

profileRouter.patch('/acceptFriendRequest', (req, res) => {
  const { username } = req.user;
  const { friendRequests } = req.body
  console.log(friendRequests[0], "friend")

  User.findOneAndUpdate({ username }, { $pull: { 'friendRequests': {$in: friendRequests }}}, { new: true })
    .then(() => User.findOneAndUpdate({ username }, { $push: { 'friends': friendRequests[0] }}, { new: true }))
})


module.exports = profileRouter;