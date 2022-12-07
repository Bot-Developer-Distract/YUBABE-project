const mongoose = require('mongoose');
const { Schema } = mongoose;

const badgeSchema = new Schema({ 
  memberid: String,
  badge : String,
});

module.exports = mongoose.model('badgeSchema', badgeSchema);