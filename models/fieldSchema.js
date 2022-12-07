const mongoose = require('mongoose');
const { Schema } = mongoose;

const fieldSchema = new Schema({ name: String, quanlity: Number });

module.exports = mongoose.model('FieldSchema', fieldSchema);