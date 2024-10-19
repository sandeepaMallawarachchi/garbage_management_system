const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const customerController = require("../controller/customerController");
const paymentController = require('../controller/paymentController');
const authMiddleware = require("../middlewares/authMiddleware");

// Login route
router.post("/login", customerController.cusLogin);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to admin dashboard");
});

//register route
router.post("/register", customerController.registerCustomer);

// PayHere notify route
router.post('/notify', paymentController.handlePayHereNotification);

//schedule route
router.post("/addSchedule/:cusID", customerController.scheduleCollection);

//get all schedule route
router.get("/getAllSchedules/:cusID", customerController.getAllSchedulesById);

//get a schedule route
router.get("/getSchedule/:cusID/:scheduleID", customerController.getScheduleById);

//update schedule route
router.put("/updateSchedule/:cusID/:scheduleID", customerController.updateSchedule);

//delte schedule route
router.delete("/deleteSchedule/:cusID/:scheduleID", customerController.deleteSchedule);

module.exports = router;