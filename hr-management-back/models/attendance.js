const mongoose = require("mongoose")

const attendance = new mongoose.Schema({
    user_id: String,
    date: String,
    check_in_time: String,
    check_out_time: String
})
module.exports = mongoose.model('attendance_records',attendance);