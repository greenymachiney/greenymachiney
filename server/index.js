const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const { User, Drink } = require('./database');
const authRouter = require('./routes/auth-routes');
const drunkRouter = require('./routes/drunk-routes');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/keys');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

const app = express();

app.use(cookieParser());
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

// app.get('/users/:username', (req, res) => {
//   const { username } = req.params;
//   console.log('USERNAME: ', username);
//   res.clearCookie('user');
//   res.cookie('username', username);
//   res.redirect('/');
// })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'))
})

app.put('/user/liquorList', (req, res) => {
  User.findOneAndUpdate({liquorList: []}, {$push: {liquorList: req.body.data}})
        .then(() => res.status(200).send())
        .catch((err) => {
          console.error(err);
          res.sendStatus(404);
        });
 
});


app.listen(PORT, () => {
  console.log(`
    Server is listening at:
    http://127.0.0.1:${PORT}
  `);
});
