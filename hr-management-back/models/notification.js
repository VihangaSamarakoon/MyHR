const mongoose = require("mongoose");

const notification = new mongoose.Schema({
    emp_id: String,
    message: String,
    aid: String,
    createTime: Date
});

module.exports = mongoose.model('notifications',notification);