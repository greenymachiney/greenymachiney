const mongoose = require('mongoose');

const DrinkSchema = new mongoose.Schema({
  title: String,
  author: String,
  imageUrl: String,
  body: String,
  views: { type: Number, default: 0 },
}, { timestamps: true });

const Drink = mongoose.model('Drink', DrinkSchema);

module.exports = Drink;
