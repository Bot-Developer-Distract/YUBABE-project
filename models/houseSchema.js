const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
	id: String,
  quanlity: Number,
})
module.exports = mongoose.model('houseSchema', houseSchema)