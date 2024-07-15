// routes/sub_space_routes.js

const express = require('express');
const Sub_space = require('../models/sub_space');
const Space = require('../models/space');
const router = express.Router();

// Create a new sub-space
router.post('/', async (req, res) => {
    const { sub_space_name, space } = req.body;

    try {
        const foundSpace = await Space.findById(space);
        if (!foundSpace) {
            return res.status(404).json({ message: "Space not found" });
        }

        const sub_space = new Sub_space({
            space: foundSpace._id,
            sub_space_name: sub_space_name
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try {
        const sub_space = await Sub_space.findById(req.params.id).populate('space');
        res.json(sub_space);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update sub-space by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedSub_space = await Sub_space.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('space');
        res.json(updatedSub_space);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete sub-space by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSub_space = await Sub_space.findOneAndDelete({ _id: req.params.id });
        if (!deletedSub_space) {
            return res.status(404).json({ message: "Sub-space not found" });
        }
        res.json({ message: `Sub-space ${deletedSub_space.sub_space_name} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
