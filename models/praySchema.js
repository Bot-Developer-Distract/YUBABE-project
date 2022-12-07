const mongoose = require('mongoose');

const praySchema = new mongoose.Schema({
	id: String,
	prays: 0,
})
module.exports = mongoose.model('praySchema', praySchema) 