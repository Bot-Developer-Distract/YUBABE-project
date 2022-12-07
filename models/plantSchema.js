const mongoose = require('mongoose')
const plantSchema = new mongoose.Schema({
  key: String,
  value: String,
})
module.exports = mongoose.model('plantSchema', plantSchema);