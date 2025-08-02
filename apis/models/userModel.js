const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
    email: {
        type: String,
        required: true, 
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    role: { type: String },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
    createdAt: { type: Date, default: new Date().toISOString() }
});

module.exports = mongoose.model('User', userSchema)