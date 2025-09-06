const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');
const Organization = require('../models/organization.model');
const auditLogger = require('../utils/auditLogger');

exports.signup = async (req, res) => {
    try {
        if (!req.body.organization) {
            return res.status(400).json({ message: 'Organization details are required' });
        }
        const organization = await Organization.create({
            name: req.body.organization.name,
            description: req.body.organization.description || '',
            contactEmail: req.body.email,
            contactPhone: req.body.organization.contactPhone || '',
            address: req.body.organization.address || ''
        });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            organizationId: organization._id,
            role: 'admin'
        });


        const token = jwt.sign(
            {
                id: user._id,
                organizationId: organization._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                organizationId: organization._id,
                role: user.role
            },
            organization: {
                id: organization._id,
                name: organization.name
            },
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate('organizationId', 'name');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.organizationId) {
            console.error('User has no associated organization:', user._id);
            return res.status(500).json({ message: 'User account has no organization. Please contact support.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                organizationId: user.organizationId._id || user.organizationId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        await auditLogger({
            organizationId: user.organizationId,
            userId: user._id,
            action: 'login',
            status: isPasswordValid ? 'success' : 'failure',
            details: { email: req.body.email }
        });

        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name || '',
                organizationId: user.organizationId._id || user.organizationId,
                organizationName: user.organizationId.name || 'Your Organization',
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};