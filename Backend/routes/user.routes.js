const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Role = require('../models/role.model');

router.post('/adduser', async (req, res) => {
    try {
        const { name, email, phone, dob, role, status, createdDate } = req.body;
        if (!name || !email || !phone || !dob || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const roleDetails = await Role.findById(role);
        if (!roleDetails) return res.status(404).json({ message: 'Role not found' });

        const newUser = new User({
            name,
            email,
            phone,
            dob,
            role,
            status: status || false,
            createdDate: new Date(createdDate) || new Date(),
        });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/edit/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/', async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) return res.status(400).json({ message: 'Invalid request' });
    
    try {
        const result = await User.deleteMany({ _id: { $in: ids } });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Users deleted successfully' });
        } else {
            res.status(404).json({ message: 'No users found to delete' });
        }
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
