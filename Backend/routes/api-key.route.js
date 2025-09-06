const express = require('express');
const router = express.Router();
const { generateApiKey, revokeApiKey, rotateApiKey } = require('../controllers/api-key.controller');
const { authMiddleware, isAdmin } = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, isAdmin, generateApiKey);
router.post('/revoke', authMiddleware, isAdmin, revokeApiKey);
router.post('/rotate', authMiddleware, isAdmin, rotateApiKey);

module.exports = router;