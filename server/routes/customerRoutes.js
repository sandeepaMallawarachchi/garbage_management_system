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

//get customer by id route
router.get('/getCustomer/:cusID', customerController.getCustomerById);

//get all customers route
router.get('/getAllCustomers', customerController.getAllCustomers);

//delete customer route
router.get('/deleteCustomer/:cusID', customerController.deleteCustomer)

// PayHere notify route
router.post('/notify', paymentController.handlePayHereNotification);

//schedule route
router.post("/addSchedule/:cusID", customerController.scheduleCollection);

//get all schedule route
router.get("/getAllSchedules/:cusID", customerController.getAllSchedulesById);

//get all schedules
router.get("/get/all", customerController.getAllSchedules);

//get a schedule route
router.get("/getSchedule/:cusID/:scheduleID", customerController.getScheduleById);

//update schedule route
router.put("/updateSchedule/:cusID/:scheduleID", customerController.updateSchedule);

router.put("/accepted/:cusID/:scheduleID", customerController.acceptSchedule);
router.put("/rejected/:cusID/:scheduleID", customerController.rejectSchedule)

//delete schedule route
router.delete("/deleteSchedule/:cusID/:scheduleID", customerController.deleteSchedule);

//get waste levels route
router.get("/getWasteLevels/:cusID", customerController.getWasteLevels);

//get accepted schedules route
router.get("/getAcceptedSchedules", customerController.acceptSchedule);

module.exports = router;