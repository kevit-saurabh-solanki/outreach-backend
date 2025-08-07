const mongoose = require('mongoose');

const workspaceSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: new Date().toISOString }
});

module.exports = mongoose.model('Workspace', workspaceSchema);