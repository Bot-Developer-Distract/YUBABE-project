const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
	id: String,
  coins: Number,
})
module.exports = mongoose.model('bankSchema', bankSchema)