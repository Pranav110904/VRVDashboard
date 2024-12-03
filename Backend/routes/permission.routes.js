const express = require('express');
const router = express.Router();
const Permission = require('../models/permission.model');

// Add permission
router.post('/', async (req, res) => {
    try {
        const { permission } = req.body;
        if (!permission) return res.status(400).json({ message: 'Permission name is required' });

        const newPermission = new Permission({ name: permission });
        await newPermission.save();
        res.status(201).json({ message: 'Permission added successfully', data: newPermission });
    } catch (error) {
        console.error('Error saving permission:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all permissions
router.get('/', async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json(permissions);
    } catch (error) {
        console.error('Error fetching permissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
