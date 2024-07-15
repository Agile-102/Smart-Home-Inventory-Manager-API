// api/index.js

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

app.use(express.json());

/*
Replace one or the other
local test:
mongoose.connect(mongoString);
server:
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
*/

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => console.error(error));
database.once('connected', () => console.log('Database Connected'));

/*
For local testing:
app.listen(3000, () => {console.log(`Server Started at ${3000}`)})
*/

/* Routes */
const spaceRoutes = require('../routes/space_routes');
const subSpaceRoutes = require('../routes/sub_space_routes');
const itemRoutes = require('../routes/item_routes');

app.use('/api/spaces', spaceRoutes);
app.use('/api/sub_spaces', subSpaceRoutes);
app.use('/api/items', itemRoutes);

module.exports = app;
