const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Customer = require("../models/customerDetails");
const Schedule = require("../models/collectionDetails");

//customer login
exports.cusLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the customer by email
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with bcrypt
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token valid for 24 hours
    const token = jwt.sign({ cusID: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    // Send response with JWT token
    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        cusID: customer.cusID,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get customer by id
exports.getCustomerById = async (req, res) => {
  const { cusID } = req.params;

  try {
    const customer = await Customer.findOne({ cusID });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//register new customer
exports.registerCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      address,
      phone,
    } = req.body;

    const existingCustomer = await Customer.findOne({ $or: [{ email }, { phone }] });
    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer with this email or phone number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer created successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//new waste collection schedule
exports.scheduleCollection = async (req, res) => {
  try {
    const { cusID } = req.params;
    const {
      scheduleID,
      wasteType,
      address,
      amount,
      remarks,
      date,
      scheduleType,
      paymentMethod,
      price,
      status,
    } = req.body;

    const newSchedule = {
      scheduleID,
      wasteType,
      address,
      amount,
      remarks,
      date: scheduleType === 'general' ? null : new Date(date),
      scheduleType,
      paymentMethod,
      price,
      status,
    };

    const existingCustomer = await Schedule.findOne({ cusID });
    if (existingCustomer) {
      existingCustomer.schedules.push(newSchedule);
      await existingCustomer.save();
    } else {
      const newCustomerSchedule = new Schedule({
        cusID,
        schedules: [newSchedule],
      });
      await newCustomerSchedule.save();
    }

    res.status(201).json({ message: "Schedule created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schedules by cusID
exports.getAllSchedulesById = async (req, res) => {
  const { cusID } = req.params;

  try {
    const customer = await Schedule.findOne({ cusID });

    if (!customer) {
      return res.status(404).json({ message: "Schedules not found" });
    }
    res.status(200).json(customer.schedules);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get schedule by cusID and scheduleID
exports.getScheduleById = async (req, res) => {
  const { cusID, scheduleID } = req.params;

  try {
    const customer = await Schedule.findOne(
      { cusID, 'schedules.scheduleID': scheduleID },
      { 'schedules.$': 1 }
    );

    if (!customer || customer.schedules.length === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(customer.schedules[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update schedule by cusID and scheduleID
exports.updateSchedule = async (req, res) => {
  const { cusID, scheduleID } = req.params;
  const {
    wasteType,
    address,
    amount,
    remarks,
    date,
    scheduleType,
    paymentMethod,
  } = req.body;

  try {
    const customer = await Schedule.findOneAndUpdate(
      { cusID, 'schedules.scheduleID': scheduleID },
      {
        $set: {
          'schedules.$.wasteType': wasteType,
          'schedules.$.address': address,
          'schedules.$.amount': amount,
          'schedules.$.remarks': remarks,
          'schedules.$.date': new Date(date),
          'schedules.$.scheduleType': scheduleType,
          'schedules.$.paymentMethod': paymentMethod,
        },
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete schedule by cusID and scheduleID
exports.deleteSchedule = async (req, res) => {
  const { cusID, scheduleID } = req.params;

  try {
    const updatedCustomer = await Schedule.findOneAndUpdate(
      { cusID },
      { $pull: { schedules: { scheduleID } } },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};