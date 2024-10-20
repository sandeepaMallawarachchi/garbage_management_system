const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    cusID: {
        type: String,
        required: true,
        unique: true,
    },
    schedules: [
        {
            scheduleID: {
                type: String,
                required: true,
                default: () => `schedule_${new Date().getTime()}`,
            },
            wasteType: {
                type: String,
                required: true,
                enum: ['organic', 'recyclable', 'eWaste'],
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
            },
            price: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
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
            status: {
                type: String,
                require: true,
                default: 'pending'
            }
        }
    ]
});

const Schedule = mongoose.model("Schedule", collectionSchema);
module.exports = Schedule;