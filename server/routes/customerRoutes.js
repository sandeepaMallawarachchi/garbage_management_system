const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const customerController = require("../controller/customerController");
const authMiddleware = require("../middlewares/authMiddleware");

// Login route
router.post("/login", customerController.cusLogin);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Welcome to admin dashboard");
});

//register route
router.post("/register", customerController.registerCustomer);

module.exports = router;