const mongoose = require('mongoose');
const Message = require('../models/messageModel');

//add a message template-------------------------------------------------------------------------
exports.add_messageTemplate = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        messageType: req.body.messageType,
        content: req.body.content,
        workspace_id: req.userData.workspace_id,
        createdBy: req.userData.user_id
    });
    message.save()
        .then(result => {
            console.log("Message added successfully");
            res.status(200).json({
                message_id: result._id,
                message_title: result.title,
                message_type: result.type,
                message_content: result.content,
                workspace_id: result.workspace_id,
                message_createdBy: result.createdBy
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}

//fetch all message template-------------------------------------------------------------------------
exports.fetch_all_message = (req, res, next) => {
    Message.find().exec()
        .then(result => {
            console.log('All messages sent');
            res.status(200).json({
                Messages: result.map(message => {
                    return {
                        message_id: message._id,
                        message_title: message.title,
                        message_type: message.type,
                        message_content: message.content,
                        message_workspace_id: message.workspace_id,
                        message_createdBy: message.createdBy
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//edit a message template-------------------------------------------------------------------------
exports.edit_message = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Message.findOneAndUpdate({ _id: req.params.messageId }, { $set: { title: req.body.title, type: req.body.type, content: req.body.content } }, { returnDocument: "after" }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No message template found" });
            }
            console.log("Message template edited successfully");
            res.status(200).json({
                edit_title: result.title,
                edit_type: result.type,
                edit_content: result.content
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//delete message template-------------------------------------------------------------------------
exports.delete_message = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Contacts.findOneAndDelete({ _id: req.params.messageId }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No message template found" });
            }
            console.log("message template deleted successfully");
            res.status(200).json({
                delete_id: result._id,
                delete_title: result.title,
                delete_type: result.type,
                delete_content: result.content
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}