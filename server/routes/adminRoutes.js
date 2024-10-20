const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.put("/schedule/:cusID/:scheduleID", customerController.setPrice_Status);

module.exports = router;