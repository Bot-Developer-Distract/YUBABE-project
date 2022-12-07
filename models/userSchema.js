const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({ 
  memberid: String,
  membername : String,
  vip : String,
  pro: String,
  avatar : String,
  about : String,
  description: String,
});

module.exports = mongoose.model('userSchema', userSchema);