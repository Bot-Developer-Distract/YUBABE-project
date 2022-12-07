const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  memberid: String,
  type: String,
  isWeekend: Boolean,
  query : String,
  vote : Number,
  streak : Number,
})
module.exports = mongoose.model('voteSchema', voteSchema)