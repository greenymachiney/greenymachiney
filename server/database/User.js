const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  drinks: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;