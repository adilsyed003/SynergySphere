const AuditLog = require('../models/audit.model.js');

module.exports = async ({ organizationId, userId, action, status, details }) => {
    await AuditLog.create({ organizationId, userId, action, status, details });
};