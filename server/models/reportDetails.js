const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    mostusedType: {
        type: String,
        required: true,
    },
    mostusedTypeWeight: {
        type: String,
        required: true,
    },
    leastusedType: {
        type: String,
        required: true,
    },
    leastusedTypeWeight: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    income: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;