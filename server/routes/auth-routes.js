const { Router } = require('express');
const authRouter = Router();
const passport = require('passport');

//auth login with google
authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

//callback redirect for google
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //console.log('COOKIE ', req.user.username);
  //res.cookie('user', req.user.username);
  //console.log(req.cookies);
  res.redirect(`/${req.user.username}`);
  //res.json(req.user.username);
})

//auth logout
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = authRouter;








