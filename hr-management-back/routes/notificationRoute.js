const express = require("express");
const notifi = express.Router();
const notifiController = require('../controller/notificationController');
const empAuth = require("../controller/empAuth");

notifi.post("/",notifiController.create);
notifi.get("/",notifiController.getByEmpId);

module.exports = notifi;