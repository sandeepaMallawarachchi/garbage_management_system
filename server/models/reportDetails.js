const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    wasteType: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;