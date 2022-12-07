const mongoose = require('mongoose');
const { Schema } = mongoose;

const animalSchema = new Schema({ id: String, name: String, quanlity: Number, type : String });

module.exports = mongoose.model('animalSchema', animalSchema);