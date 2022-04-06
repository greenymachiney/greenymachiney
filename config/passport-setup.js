const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const keys = require('./keys');
const User = require('../server/database/User');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(
  new GoogleStrategy({
    //options for google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    //passport cb
    //check if user already exists
    User.findOne({ googleId: profile.id })
      .then(currentUser => {
        if (currentUser) {
          //user already exists
          done(null, currentUser);
        } else {
          //user doesn't exist, create new user
          User.create({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile.photos[0].value
          })
          .then(newUser => {
            done(null, newUser);
          })
        }
      })
  })
);