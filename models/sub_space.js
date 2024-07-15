// models/sub_space.js

const mongoose = require('mongoose');
const Item = require('./item');

const sub_spaceSchema = new mongoose.Schema({
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    sub_space_name: {
        required: true,
        type: String
    }
});

// Middleware to handle cascading deletes
sub_spaceSchema.pre('findOneAndDelete', async function(next) {
    const subSpaceId = this.getQuery()['_id'];
    console.log(`Deleting sub_space with ID: ${subSpaceId}`);
    await Item.deleteMany({ sub_space: subSpaceId });
    next();
});

module.exports = mongoose.model('Sub_space', sub_spaceSchema);
