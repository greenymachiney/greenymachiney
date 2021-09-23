const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: String,
  author: String,
  imageUrl: String,
  body: String,
  views: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;