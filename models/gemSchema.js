const mongoose = require('mongoose');
const { Schema } = mongoose;

const gemSchema = new Schema({
  memberid: String,
  quanlity: Number,
  typeS: String,
  type : Number,
});

module.exports = mongoose.model('gemSchema', gemSchema);