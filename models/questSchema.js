const mongoose = require('mongoose');
const { Schema } = mongoose;

const questSchema = new Schema({ memberid: String, questtype: Number, process: Number });

module.exports = mongoose.model('questSchema', questSchema);