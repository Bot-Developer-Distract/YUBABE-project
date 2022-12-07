const mongoose = require('mongoose');

const xosoSchema = new mongoose.Schema({
  id: String,
  number1: Number,
  number2: Number,
  number3: Number,
  number4: Number,
  number5: Number,
  number6: Number,
  number7: Number,
  number8: Number,
  number9: Number,
  number10: Number,
})
module.exports = mongoose.model('xosoSchema', xosoSchema)