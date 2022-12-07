const mongoose = require("mongoose");

const captchaSchema = mongoose.Schema({
  userID: String,
  username: String,
  times: Number,
  counts: Number,
  totalCounts: Number,
});

module.exports = mongoose.model("captcha", captchaSchema);
