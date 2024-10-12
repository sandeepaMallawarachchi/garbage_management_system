const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        if (process.env.NODE_ENV !== 'deployment') {
            console.log('Database connection success');
        }
    } catch (err) {
        console.error('Database connection error: ' + err.message);
        process.exit(1);
    }
};

module.exports = connectDB;