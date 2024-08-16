const mongoose = require('mongoose');

require('dotenv').config();
const mongoString = process.env.MONGODB_URI;

const connectToDB = () => {
    mongoose.connect(mongoString);
    global.db = mongoose.connection

    db.on('error', (err) => {
        console.log(err);
    })

    db.once('connected', () => {
        console.log('Database Connected');
    })
}

module.exports = connectToDB;