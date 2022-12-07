const mongoose = require('mongoose');
const { Schema } = mongoose;

const cropSchema = new Schema({ name: String, quanlity: Number });

module.exports = mongoose.model('CropSchema', cropSchema);