// models/space.js

const mongoose = require('mongoose');
const Sub_space = require('./sub_space');

const spaceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    space_name: {
        required: true,
        type: String
    }
});

// Middleware to handle cascading deletes
spaceSchema.pre('findOneAndDelete', async function(next) {
    const spaceId = this.getQuery()['_id'];
    await Sub_space.deleteMany({ space: spaceId });
    next();
});

module.exports = mongoose.model('Space', spaceSchema);
