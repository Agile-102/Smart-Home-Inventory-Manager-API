const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    itemName:{
        required: true,
        type: String
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subspaces',
        required: false
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms',
        required: false
    }
});

module.exports = mongoose.model('Items', itemsSchema);