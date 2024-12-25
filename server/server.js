const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/dbConnection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const customerRouter = require('./routes/customerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reportRoutes = require('./routes/reportRoutes')
const chatbotRoutes = require('./routes/chatbotRoutes');

// Use routes
app.use('/customer', customerRouter);
app.use('/admin', adminRoutes);
app.use('/report', reportRoutes);
app.use('/chatbot', chatbotRoutes);

// DB connection
dbConnection();

// Server listen
if (process.env.NODE_ENV !== 'deployment') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}