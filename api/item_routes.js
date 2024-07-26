// api/item_routes.js

const express = require('express');
const mongoose = require('mongoose');
const Item = require('../models/item');
const Sub_space = require('../models/sub_space');
const router = express.Router();

// Create a new item
router.post('/', async (req, res) => {
    const { item_name, sub_space_id, quantity, expiry_date } = req.body;

    // Validate sub_space_id
    if (!mongoose.Types.ObjectId.isValid(sub_space_id)) {
        return res.status(400).json({ message: "Invalid sub_space_id" });
    }

    try {
        const sub_space = await Sub_space.findById(sub_space_id);
        if (!sub_space) {
            return res.status(404).json({ message: "Sub_space not found" });
        }

        const item = new Item({
            sub_space: sub_space_id,
            quantity: quantity,
            item_name: item_name,
            expiry_date: expiry_date
        });

        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('sub_space');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('sub_space');
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update item by ID
router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('sub_space');
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.json({ message: `Item ${deletedItem.item_name} deleted` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
