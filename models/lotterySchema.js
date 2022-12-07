const mongoose = require('mongoose');

const lotterySchema = new mongoose.Schema({
  authorid: String,
  money: Number,
  time: Number
})
module.exports = mongoose.model('lotterySchema', lotterySchema)