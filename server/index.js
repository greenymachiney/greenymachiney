const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { User, Drink } = require('./database');
const authRouter = require('./routes/auth-routes');
const drunkRouter = require('./routes/drunk-routes');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/keys');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, //one day
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', authRouter);
app.use('/drunk', drunkRouter)









app.listen(PORT, () => {
  console.log(`
    Server is listening at:
    http://127.0.0.1:${PORT}
  `);
});
