const mongoose = require('mongoose');
const { Schema } = mongoose;

const powerfishing = new Schema({ power: String, quanlity: Number });

module.exports = mongoose.model('PowerFishing', powerfishing);