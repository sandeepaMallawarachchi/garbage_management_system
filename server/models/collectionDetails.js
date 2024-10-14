const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    cusID: {
        type: String,
        required: true,
    },
    scheduleID: {
        type: String,
        required: true,
        unique: true,
        default: () => `schedule_${new Date().getTime()}`,
    },
    wasteType: {
        type: String,
        required: true,
        enum: ['organic', 'recycable', 'eWaste'],
    },
    address: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false
    },
    scheduleType: {
        type: String,
        required: true,
        enum: ['general', 'special'],
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'card'],
    },
});

const Schedule = mongoose.model("Schedule", collectionSchema);

module.exports = Schedule;