const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceAndAmountSchema = new Schema({
    genaralPrice: {
        type: Number,
        required: true,
        default: 0
    },
    genaralAmount: {
        type: Number,
        required: true,
        default: 0
    },
    specialPrice: {
        type: Number,
        required: true,
        default: 0
    },
    specialAmount: {
        type: Number,
        required: true,
        default: 0
    },
});

const PriceAndAmount = mongoose.model("PriceAndAmount", priceAndAmountSchema);

module.exports = PriceAndAmount;