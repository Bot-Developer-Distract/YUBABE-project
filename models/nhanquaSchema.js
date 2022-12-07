const mongoose = require('mongoose')
const nhanquaSchema = new mongoose.Schema({
  userid: String
})
module.exports = mongoose.model('nhanquaSchema', nhanquaSchema);