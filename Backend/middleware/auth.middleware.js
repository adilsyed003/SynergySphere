const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
const User = require('../models/auth.model');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required. Invalid token format.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again.' });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.id) {
            return res.status(401).json({ message: 'Invalid token: Missing user ID' });
        }
        
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token: User not found' });
        }
        
        req.user = {
            id: user._id,
            email: user.email,
            name: user.name || 'User',
            role: user.role || 'employee'
        };
        
        if (!decoded.organizationId && !user.organizationId) {
            console.error('User has no organization ID:', user._id);
            return res.status(500).json({ message: 'User account issue: Missing organization' });
        }
        
        if (decoded.organizationId) {
            req.organizationId = typeof decoded.organizationId === 'object' 
                ? decoded.organizationId._id || decoded.organizationId
                : decoded.organizationId;
        } else if (user.organizationId) {
            req.organizationId = typeof user.organizationId === 'object'
                ? user.organizationId._id || user.organizationId
                : user.organizationId;
        }
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

const isManagerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Manager or admin access required' });
    }
};

module.exports = { 
    verifyToken,
    authMiddleware,
    isAdmin,
    isManagerOrAdmin
}; 