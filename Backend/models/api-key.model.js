const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
    key:
     { type: String, 
        required: true, 
        unique: true
     },
    organizationId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Organization',
          required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    revoked: {
        type: Boolean,
        default: false
    },
    lastUsedAt: {
        type: Date
     }
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);