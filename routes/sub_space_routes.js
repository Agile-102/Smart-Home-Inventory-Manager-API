// routes/sub_space_routes.js

const express = require('express');
const Sub_space = require('../models/sub_space');
const Space = require('../models/space');
const router = express.Router();

// Create a new sub-space
router.post('/sub_spaces', async (req, res) => {
    const { sub_space_name, space_id } = req.body;

    // Validate space_id and user_id
    try {
        const space = await Space.findById(space_id);
        if (!space || space.user_id.toString() !== req.body.user_id) {
            return res.status(404).json({ message: "Space not found or not authorized" });
        }

        const sub_space = new Sub_space({
            sub_space_name: sub_space_name,
            space: space_id
        });

        try {
            const newSub_space = await sub_space.save();
            res.status(201).json(newSub_space);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid space_id" });
    }
});

// Get all sub-spaces for a user
router.get('/sub_spaces', async (req, res) => {
    try {
        const sub_spaces = await Sub_space.find().populate({
            path: 'space',
            match: { user_id: req.body.user_id }
        });
        res.json(sub_spaces);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get sub-space by ID
router.get('/sub_spaces/:id', async (req, res) => {
    try {
        const sub_space = await Sub_space.findById(req.params.id).populate('space');
        res.json(sub_space);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update sub-space by ID
router.patch('/sub_spaces/:id', async (req, res) => {
    try {
        const updatedSub_space = await Sub_space.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('space');
        res.json(updatedSub_space);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete sub-space by ID
router.delete('/sub_spaces/:id', async (req, res) => {
    try {
        const deletedSub_space = await Sub_space.findByIdAndDelete(req.params.id);
        res.json({ message: `Sub-space ${deletedSub_space.sub_space_name} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
