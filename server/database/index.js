const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/drinkdat';

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  db,
  Drink: require('./Drink.js'),
  User: require('./User.js')
};
