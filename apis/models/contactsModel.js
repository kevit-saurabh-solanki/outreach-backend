const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    tags: { type: Array, required: true },
    workspace_id: { type: Number, ref: 'Workspace', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkspaceUser', required: true }
});

module.exports = mongoose.model('Contacts', contactsSchema);