const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Customer = require("../models/customerDetails");
const Schedule = require("../models/collectionDetails");
const PriceAndAmount = require("../models/PriceAndAmountDetails");
const nodemailer = require("nodemailer");

//customer login
exports.cusLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check for admin credentials
  const isAdmin = email === "admin@gmail.com" && password === "admin@123";
  if (isAdmin) {
    return res.status(200).json({
      message: "Login successful",
      admin: 1,
    });
  }

  // Check for waste truck driver credentials
  const isDriver = email === "driver@gmail.com" && password === "driver@123";
  if (isDriver) {
    return res.status(200).json({
      message: "Login successful",
      driver: 1,
    });
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

//get all customers
exports.getAllCustomers = async (req, res) => {

  try {
    const customer = await Customer.find();

    if (!customer) {
      return res.status(404).json({ message: "Customers not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customers details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//delete user
exports.deleteCustomer = async (req, res) => {
  const { cusID } = req.params;

  try {
    const customer = await Customer.deleteOne({ cusID: cusID });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error.message);
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

//Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    if (!schedules) {
      return res.status(404).json({ message: "No schedules exists" })
    }
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

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

  console.log(date)

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

//update price & status
exports.setPrice_Status = async (req, res) => {
  const { cusID, scheduleID } = req.params;
  const {
    price,
    status } = req.body;

  try {
    const customer = await Schedule.findOneAndUpdate(
      { cusID, 'schedules.scheduleID': scheduleID },
      {
        $set: {
          'schedules.$.price': price,
          'schedules.$.status': status,
        },
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error updating schedule:", error.message);
    res.status(400).json({ message: "Invalid data error" });
  }
}

exports.acceptSchedules = async (req, res) => {
  const { cusID, scheduleID } = req.params;
  const { date } = req.body;

  console.log(`Accepting schedule: ${scheduleID} for customer: ${cusID} with date: ${date}`);

  try {
    const customer = await Schedule.findOneAndUpdate(
      { cusID, 'schedules.scheduleID': scheduleID },
      {
        $set: {
          'schedules.$.status': 'accepted',
          'schedules.$.date': date ? new Date(date) : null,
        }
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error accepting schedule:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.rejectSchedule = async (req, res) => {
  const { cusID, scheduleID } = req.params;
  const { date } = req.body;

  console.log(`Rejecting schedule: ${scheduleID} for customer: ${cusID} with date: ${date}`);

  try {
    const customer = await Schedule.findOneAndUpdate(
      { cusID, 'schedules.scheduleID': scheduleID },
      {
        $set: {
          'schedules.$.status': 'rejected',
          'schedules.$.date': date ? new Date(date) : null,
        }
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error rejecting schedule:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get waste levels
exports.getWasteLevels = async (req, res) => {
  const { cusID } = req.params;

  try {
    const customer = await Schedule.findOne({ cusID });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const wasteLevels = {
      organic: 0,
      recyclable: 0,
      eWaste: 0,
    };

    customer.schedules.forEach(schedule => {
      const { wasteType, amount } = schedule;

      if (wasteType === 'organic') {
        wasteLevels.organic += parseInt(amount, 10) || 0;
      } else if (wasteType === 'recyclable') {
        wasteLevels.recyclable += parseInt(amount, 10) || 0;
      } else if (wasteType === 'eWaste') {
        wasteLevels.eWaste += parseInt(amount, 10) || 0;
      }
    });

    res.status(200).json(wasteLevels);
  } catch (error) {
    console.error('Error fetching waste levels:', error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get accepted schedules
exports.acceptSchedule = async (req, res) => {
  try {
    const acceptedSchedules = await Schedule.find({ 'schedules.status': 'accepted' });

    let organicWaste = 0;
    let recyclableWaste = 0;
    let eWaste = 0;
    const scheduleDetails = [];

    acceptedSchedules.forEach((scheduleDoc) => {
      scheduleDoc.schedules.forEach((schedule) => {
        if (schedule.status === 'accepted') {
          const amount = parseFloat(schedule.amount);
          scheduleDetails.push({
            scheduleID: schedule.scheduleID,
            wasteType: schedule.wasteType,
            address: schedule.address,
            amount,
            price: schedule.price,
            date: schedule.date,
            remarks: schedule.remarks,
          });
          switch (schedule.wasteType) {
            case 'organic':
              organicWaste += amount;
              break;
            case 'recyclable':
              recyclableWaste += amount;
              break;
            case 'eWaste':
              eWaste += amount;
              break;
          }
        }
      });
    });

    res.status(200).json({
      organicWaste,
      recyclableWaste,
      eWaste,
      scheduleDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste levels', error });
  }
};

// Update price and amount based on schedule type or insert if not exists
exports.updatePriceAndAmount = async (req, res) => {
  const { scheduleType } = req.params;
  const { price, amount } = req.body;

  try {
    const updatedData = {};
    if (scheduleType === 'general') {
      updatedData.genaralPrice = price;
      updatedData.genaralAmount = amount;
    } else if (scheduleType === 'special') {
      updatedData.specialPrice = price;
      updatedData.specialAmount = amount;
    } else {
      return res.status(400).json({ message: "Invalid schedule type" });
    }

    const result = await PriceAndAmount.findOneAndUpdate(
      {},
      { $set: updatedData },
      { new: true, upsert: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current price and amount
exports.getPriceAndAmount = async (req, res) => {
  const { scheduleType } = req.params;

  try {
    const schedule = await PriceAndAmount.findOne();

    if (!schedule) {
      return res.status(404).json({ message: "Price and amount data not found" });
    }

    if (scheduleType === 'general') {
      return res.status(200).json({
        price: schedule.genaralPrice,
        amount: schedule.genaralAmount,
      });
    } else if (scheduleType === 'special') {
      return res.status(200).json({
        price: schedule.specialPrice,
        amount: schedule.specialAmount,
      });
    } else {
      return res.status(400).json({ message: "Invalid schedule type" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//contact us
exports.contactUs = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Us: ${subject}`,
      text: `From: ${email}\n\n${message}`,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error("Error sending email:", error);
  }
};
