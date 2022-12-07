const mongoose = require('mongoose');
const { Schema } = mongoose;

const growSchema = new Schema({ name: String, quanlity: Number });

module.exports = mongoose.model('GrowSchema', growSchema);