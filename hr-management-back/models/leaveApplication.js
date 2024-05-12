const mongoose = require("mongoose");

const leaveApplication = new mongoose.Schema({
    emp_id: String,
    start_date: String,
    end_date: String,
    reason: String,
    status: String,
    created_at:Date
});

module.exports = mongoose.model('leave_applications',leaveApplication);