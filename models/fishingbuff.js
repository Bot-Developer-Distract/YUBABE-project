const mongoose = require('mongoose');
const { Schema } = mongoose;

const fishingbuff = new Schema({buff: String, quanlity: Number });

module.exports = mongoose.model('fishingbuff', fishingbuff);