const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  liquorList: [],
  drinks: [],
  shoppinglist: [],
  events: [],
<<<<<<< HEAD
  userDrinks: [],
=======
  friends: [],
  friendRequests: []
>>>>>>> f9150abc70f7192a88613d23ad01ed2ea54183a0
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
