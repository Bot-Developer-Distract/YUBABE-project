const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  channelid : String,
  cmd: String,
  status : Boolean
})

module.exports = mongoose.model('configSchema', configSchema);