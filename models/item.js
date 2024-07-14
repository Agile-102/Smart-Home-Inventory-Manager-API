// models/item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_name: {
        required: true,
        type: String
    },
    sub_space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub_space',
        required: true
    },
    quantity: {
        required: true,
        type: Number,
        min: [1, 'Quantity must be at least 1']
    },
    expiry_date: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('Item', itemSchema);

