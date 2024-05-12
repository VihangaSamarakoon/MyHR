const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  module.exports = mongoose.model('admins',loginSchema);