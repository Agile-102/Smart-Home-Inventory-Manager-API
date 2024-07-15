// api/index.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

app.use(express.json());

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => console.error(error));
database.once('connected', () => console.log('Database Connected'));

/* Routes */
const spaceRoutes = require('../routes/space_routes');
const subSpaceRoutes = require('../routes/sub_space_routes');
const itemRoutes = require('../routes/item_routes');

app.use('/api/spaces', spaceRoutes);
app.use('/api/sub_spaces', subSpaceRoutes);
app.use('/api/items', itemRoutes);

module.exports = app;
