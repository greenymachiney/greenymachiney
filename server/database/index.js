const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/drinkdat';

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  db,
  User: require('./User.js'),
};
