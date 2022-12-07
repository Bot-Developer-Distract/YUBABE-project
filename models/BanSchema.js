const mongoose = require('mongoose');

const BanSchema = new mongoose.Schema({
  memberid: String,
  guildid : String,
})

module.exports = mongoose.model('BanSchema', BanSchema)