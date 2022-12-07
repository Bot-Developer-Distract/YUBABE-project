const mongoose = require('mongoose');
const { Schema } = mongoose;

const fishingSchema = new Schema({ id: String, name: String, quanlity: Number });

module.exports = mongoose.model('fishingSchema', fishingSchema);