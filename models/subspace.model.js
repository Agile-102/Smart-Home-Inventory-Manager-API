const mongoose = require('mongoose');

const subspaceSchema = new mongoose.Schema({
    subspaceName: {
        required: true,
        type: String
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items'
        }
    ],
    room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rooms'
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Subspaces', subspaceSchema);