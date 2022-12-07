const mongoose = require('mongoose');

const randomSchema = new mongoose.Schema({
	nguoimua: String,
	number1: Number,
  number2: Number,
  number3: Number,
})
module.exports = mongoose.model('randomSchema', randomSchema)