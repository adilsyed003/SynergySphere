const ApiKey = require('../models/apiKey.model');

module.exports = async (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (!apiKey) return res.status(401).json({ message: 'API key required' });

    const keyDoc = await ApiKey.findOne({ key: apiKey, revoked: false });
    if (!keyDoc) return res.status(403).json({ message: 'Invalid or revoked API key' });

    req.organizationId = keyDoc.organizationId;
    keyDoc.lastUsedAt = new Date();
    await keyDoc.save();
    next();
};