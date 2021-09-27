const { Router } = require('express');
const drunkRouter = Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user not logged in, redirect
    res.redirect('/');
  } else {
    next();
  }
}

drunkRouter.get('/', authCheck, (req, res) => {
  //res.redirect('/'); //????
  res.send('logged in ' + req.user);
})

module.exports = drunkRouter;