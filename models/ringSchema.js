const mongoose = require('mongoose');

const ringSchema = new mongoose.Schema({
	id: String,
  quanlity: Number,
})
module.exports = mongoose.model('ringSchema', ringSchema)