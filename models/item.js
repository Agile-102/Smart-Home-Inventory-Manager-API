// models/item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
    item_name: {
        required: true,
        type: String
    },
    expiry_date: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('Item', itemSchema);

