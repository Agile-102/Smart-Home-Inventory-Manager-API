const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    roomName:{
        required: true,
        type: String
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subspaces'
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items'
    }]
});

module.exports = mongoose.model('Rooms', roomsSchema);