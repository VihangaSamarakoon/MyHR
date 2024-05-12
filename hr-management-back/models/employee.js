const mongoose = require("mongoose");

const employee = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    join_date: String,
    cv: Buffer,
    userImage: Buffer,
    idImage: Buffer
});

module.exports = mongoose.model('employees',employee);