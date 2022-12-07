const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
	id: String,
	coins: Number,
})
module.exports = mongoose.model('moneySchema', moneySchema)