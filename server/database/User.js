const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  liquorList: [],
  drinks: [],
  shoppinglist: [],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;