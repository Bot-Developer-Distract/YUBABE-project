const mongoose = require('mongoose');
const { Schema } = mongoose;

const factorySchema = new Schema({ name: String, quanlity: Number });

module.exports = mongoose.model('factorySchema', factorySchema);