const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/dbConnection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// // Import routes
// const adminRouter = require('./routes/adminRoutes');

// // Use routes
// app.use('/admin', adminRouter);

// DB connection
dbConnection();

// Server listen
if (process.env.NODE_ENV !== 'deployment') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}