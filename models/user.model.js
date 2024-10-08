const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rooms'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);