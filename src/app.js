const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const connectToDB = require('../utils/mongo')

const app = express();
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectToDB();

/**
 * Routing for rooms:
 * - All CRUD functions for a room is contained in this route 
 */
const roomRoutes = require('../routes/rooms');
app.use('/room', roomRoutes);

/**
 * Routing for subspaces:
 * - All CRUD functions for a subspace is contained in this route 
 */
const subspaceRoutes = require('../routes/subspace');
app.use('/subspace', subspaceRoutes);

/**
 * Routing for items:
 * - Locating of items is contained in this route
 */
const itemRoutes = require('../routes/items');
app.use('/item', itemRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });