// routes/space_routes.js

const express = require('express');
const mongoose = require('mongoose');
const Space = require('../models/space');
const router = express.Router();

// Create a new space
router.post('/', async (req, res) => {
    const userId = req.body.user_id;

    // Validate the user_id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user_id" });
    }

    const space = new Space({
        user_id: userId,
        space_name: req.body.space_name
    });

    try {
        const newSpace = await space.save();
        res.status(201).json(newSpace);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all spaces for a user
router.get('/', async (req, res) => {
    const userId = req.query.user_id;

    // Validate the user_id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user_id" });
    }

    try {
        const spaces = await Space.find({ user_id: userId });
        res.json(spaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get space by ID
router.get('/:id', async (req, res) => {
    try {
        const space = await Space.findById(req.params.id);
        res.json(space);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update space by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSpace);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete space by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSpace = await Space.findOneAndDelete({ _id: req.params.id });
        res.json({ message: `Space ${deletedSpace.space_name} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
