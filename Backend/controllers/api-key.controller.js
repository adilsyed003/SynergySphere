const ApiKey = require('../models/api-key.model');
const crypto = require('crypto');

exports.generateApiKey = async (req, res) => {
    const key = crypto.randomBytes(32).toString('hex');
    const apiKey = await ApiKey.create({ key, organizationId: req.organizationId });
    res.status(201).json({ apiKey: apiKey.key });
};

exports.revokeApiKey = async (req, res) => {
    const { key } = req.body;
    await ApiKey.findOneAndUpdate({ key, organizationId: req.organizationId }, { revoked: true });
    res.json({ message: 'API key revoked' });
};

exports.rotateApiKey = async (req, res) => {
    const { key } = req.body;
    await ApiKey.findOneAndUpdate({ key, organizationId: req.organizationId }, { revoked: true });
    const newKey = crypto.randomBytes(32).toString('hex');
    const apiKey = await ApiKey.create({ key: newKey, organizationId: req.organizationId });
    res.json({ apiKey: apiKey.key });
};