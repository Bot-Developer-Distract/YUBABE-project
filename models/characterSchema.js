const mongoose = require('mongoose');
// Sức Mạnh, Nhanh Nhẹn, Trí Lực, Ma Lực, Hấp Dẫn và Thể Lực
const characterSchema = new mongoose.Schema({
  memberid : String,
  name: String,
  hp : Number,
  mana: Number,
  def: Number,
  magicdef : Number,
  sucmanh: Number,
  nhanhnhen : Number,
  triluc : Number,
  maluc: Number,
  hapdan : Number,
  theluc : Number,
  exp : Number,
  level : Number,
})

module.exports = mongoose.model('characterSchema', characterSchema);