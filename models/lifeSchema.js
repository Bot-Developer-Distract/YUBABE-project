const mongoose = require('mongoose');

const lifeSchema = new mongoose.Schema
  ({
 authorid: String,
  stat: {
    health: Number,
    happiness: Number,
    appear: Number,
    iq: Number,
    fitness: Number,
    eq: Number,
  },
  me: {
    name: String,
    gender: String,
    age: Number,
    birthday: String,
    country: String,
    locate: String,
    sexual: String
  },
  bank: {
    doubt: Number,
  },
  CV: String,
  crimes: String,
  health: String,
  license: {
    A: Boolean,
    B: Boolean,
    C: Boolean
  },
  education: {
    highschool: Boolean,
    college: Boolean,
    university: Boolean,
  },
  degree  : {
    kientrucsu : Boolean,
    kinhte : Boolean,
    giaovien : Boolean,
    marketing : Boolean,
    taichinh : Boolean,
    kysu : Boolean,
    luatsu : Boolean,
    anninh : Boolean,
    yte : Boolean, 
    amnhac : Boolean,
    vantai : Boolean,
    khoahoc : Boolean,
    nganhang : Boolean,
  },
})
module.exports = mongoose.model('lifeSchema', lifeSchema)