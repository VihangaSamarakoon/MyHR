const express = require("express");
const admin = express.Router();

const adminController = require('../controller/adminController');
const attendController = require('../controller/attandController');
const PDFController = require('../controller/pdfController');
const {authenticate} = require("../controller/adminController")

admin.post("/login", adminController.login );
admin.get("/leave",authenticate, adminController.getApplications );
admin.post("/leave",authenticate, adminController.approveApplications );
admin.get("/attendance",attendController.getAttandance);
admin.get("/attendance/get",authenticate,adminController.getEmpNameAttadance);
admin.post('/generatePDF', PDFController.generatePDF);
admin.get('/logout', adminController.logout);
module.exports = admin;
