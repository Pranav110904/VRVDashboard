const express = require('express');
const router = express.Router();
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

router.post('/addrole', async (req, res) => {
    try {
        const { name, active, permissions, createdDate } = req.body;
        if (!name || !permissions || !createdDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newRole = new Role({ name, active, permissions, createdDate });
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        console.error('Error saving role:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/roles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const deletedUser = await Role.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:roleId', async (req, res) => {
    try {
        const { roleId } = req.params;
        const { permissions } = req.body;

        const validPermissions = await Permission.find({ _id: { $in: permissions } });
        const validPermissionIds = validPermissions.map((perm) => perm._id.toString());
        const filteredPermissions = permissions.filter((id) => validPermissionIds.includes(id));

        const updatedRole = await Role.findByIdAndUpdate(roleId, { permissions: filteredPermissions }, { new: true }).populate('permissions');
        if (!updatedRole) return res.status(404).json({ message: 'Role not found' });

        res.status(200).json({ message: 'Permissions updated successfully', role: updatedRole });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
