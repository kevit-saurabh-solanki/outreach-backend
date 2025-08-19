const mongoose = require('mongoose');

const campaignSchema = mongoose.schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    message: { type: String, required: true },         
    targetTags: { type: Array, required: true }, 
    workspaceId: { type: Number, required: true, ref: "Workspace" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "WorkspaceUser" },          
    status: { type: String, required: true },           
    createdAt: { type: Date, default: new Date().toISOString() }
});

module.exports = mongoose.model("Campaign", campaignSchema);