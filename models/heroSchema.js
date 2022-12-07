const mongoose = require('mongoose');
const { Schema } = mongoose;

const heroSchema = new Schema({
  id: String,
  name: String,
  nguhanh: String,
  hp: Number,
  mana: Number,
  def: Number,
  mdef: Number,
  agility: Number,
  power: Number,
  gender: String,
  exp: Number,
  noitai: Boolean,
  nhanhnhen: Number,
  skill1: Number,
  effect: Number,
  nokhi: Number
});

module.exports = mongoose.model('heroSchema', heroSchema);