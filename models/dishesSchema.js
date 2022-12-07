const mongoose = require('mongoose');

const dishesSchema = new mongoose.Schema({
	authorid: String,
  name: String,
  quanlity: Number
})
module.exports = mongoose.model('dishesSchema', dishesSchema)