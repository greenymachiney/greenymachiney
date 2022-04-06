const mongoose = require('mongoose');
require('dotenv').config()
const mongoUri = process.env.MONGO_URI;


const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  db,
  User: require('./User.js'),
};
