const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  liquorList: [],
  drinks: [],
  shoppinglist: [],
  events: [],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
