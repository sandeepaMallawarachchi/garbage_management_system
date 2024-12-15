const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.put("/schedule/:cusID/:scheduleID", customerController.setPrice_Status);

router.put("/updatePriceAmount/:scheduleType", customerController.updatePriceAndAmount);

router.get("/getPriceAmount/:scheduleType", customerController.getPriceAndAmount);

module.exports = router;