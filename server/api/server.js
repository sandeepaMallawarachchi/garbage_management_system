const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/dbConnection');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const customerRouter = require('../routes/customerRoutes');
const adminRoutes = require('../routes/adminRoutes');
const reportRoutes = require('../routes/reportRoutes');
const chatbotRoutes = require('../routes/chatbotRoutes');

// Use routes
app.use('/customer', customerRouter);
app.use('/admin', adminRoutes);
app.use('/report', reportRoutes);
app.use('/chatbot', chatbotRoutes);

// DB connection
dbConnection();

// Export app for Vercel
module.exports = app;