const mongoose = require('mongoose');

const contactsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    tags: { type: Array, required: true },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Contacts', contactsSchema);