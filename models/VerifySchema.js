const mongoose = require('mongoose');
const { Schema } = mongoose;

const VerifySchema = new Schema({ 
  memberid: String,
});

module.exports = mongoose.model('VerifySchema', VerifySchema);