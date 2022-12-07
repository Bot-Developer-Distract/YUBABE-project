const mongoose = require('mongoose');
const { Schema } = mongoose;

const cattleSchema = new Schema({ name: String, quanlity: Number });

module.exports = mongoose.model('CattleSchema', cattleSchema);