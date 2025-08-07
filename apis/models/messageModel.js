const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    messageType: { type: String, required: true, enum: ["text", "image"] } ,
    content: { type: String, required: true },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Workspace" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "WorkspaceUser" },
    createdAt: { type: Date, default: new Date().toISOString() }
})

module.exports = mongoose.model("Message", messageSchema);