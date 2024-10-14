const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    cusID: {
        type: String,
        required: true,
        unique: true,
        default: () => `customer_${new Date().getTime()}`,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },

    resetCode: {
        type: Number,
        required: false
    },
    resetCodeExpires: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;