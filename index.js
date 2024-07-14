/**
* index.js
* This is the API main entry point
*/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoString = process.env.DATABASE_URL

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

/* Routes */
const spaceRoutes = require('./routes/space_routes');
const subSpaceRoutes = require('./routes/sub_space_routes');
const itemRoutes = require('./routes/item_routes');

app.use('/api', spaceRoutes);
app.use('/api', subSpaceRoutes);
app.use('/api', itemRoutes);