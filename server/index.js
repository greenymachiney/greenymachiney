const path = require("path");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { User } = require('./database');
const authRouter = require('./routes/auth-routes');
const drunkRouter = require('./routes/drunk-routes');
const eventRouter = require('./routes/event-routes');
const weatherRouter = require('./routes/weather-routes');
const shoppingRouter = require('./routes/shopping-routes');
const profileRouter = require('./routes/profile-routes')
const passportSetup = require('../config/passport-setup');
const keys = require('../config/keys');


const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, "..", "dist");

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day
    keys: [keys.session.cookieKey],
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', authRouter);
app.use('/shopping', shoppingRouter);
app.use('/drunk', drunkRouter);
app.use('/event', eventRouter);
app.use('/', weatherRouter);
app.use('/profile', profileRouter);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`
    Server is listening at port : ${PORT}
  `);
});
