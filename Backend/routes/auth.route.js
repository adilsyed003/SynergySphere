const express = require('express');
const authController = require('../controllers/auth.controller');
const bcrypt = require('bcryptjs');
const Organization = require('../models/organization.model');
const User = require('../models/auth.model');
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/create-test-account', async (req, res) => {
    try {
        let organization = await Organization.findOne({ name: 'Test Organization' });
        
        if (!organization) {
            organization = await Organization.create({
                name: 'Test Organization',
                description: 'Test organization for development',
                contactEmail: 'test@example.com',
                contactPhone: '1234567890',
                address: 'Test Address'
            });
        }
        
        let testUser = await User.findOne({ email: 'test@example.com' });
        
        if (!testUser) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            
            testUser = await User.create({
                email: 'test@example.com',
                password: hashedPassword,
                name: 'Test User',
                organizationId: organization._id,
                role: 'admin'
            });
        }
        
        res.status(200).json({
            message: 'Test account ready to use',
            credentials: {
                email: 'test@example.com',
                password: 'password123'
            }
        });
    } catch (error) {
        console.error('Error setting up test account:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/create-second-org', async (req, res) => {
    try {
        let organization = await Organization.findOne({ name: 'Second Organization' });
        
        if (!organization) {
            organization = await Organization.create({
                name: 'Second Organization',
                description: 'Second test organization for data isolation demo',
                contactEmail: 'second@example.com',
                contactPhone: '9876543210',
                address: 'Second Test Address'
            });
        }
        let testUser = await User.findOne({ email: 'second@example.com' });
        
        if (!testUser) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            
            testUser = await User.create({
                email: 'second@example.com',
                password: hashedPassword,
                name: 'Second User',
                organizationId: organization._id,
                role: 'admin'
            });
        }
        
        res.status(200).json({
            message: 'Second organization account ready to use',
            credentials: {
                email: 'second@example.com',
                password: 'password123'
            }
        });
    } catch (error) {
        console.error('Error setting up second test account:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;