const Contacts = require('../models/contactsModel');
const { default: mongoose } = require('mongoose');

//fetch all contacts-----------------------------------------------------------
exports.fetch_all_contacts = (req, res, next) => {
    Contacts.find().exec()
        .then(result => {
            console.log('All contacts sent');
            res.status(200).json({
                Contacts: result.map(contact => {
                    return {
                        _id: contact._id,
                        name: contact.name,
                        phoneNumber: contact.phoneNumber,
                        tags: contact.tags,
                        workspace_id: contact.workspace_id,
                        createdBy: contact.createdBy
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//add contact-----------------------------------------------------------
exports.add_contact = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Contacts.findOne({ $and: [{ phoneNumber: req.body.phoneNumber }, { workspace_id: req.userData.workspace_id }] }).exec()
        .then(result => {
            if (result) {
                res.status(401).json({ error: "Contact with specified phone and workspace id already exist" });
            }
            else {
                const contact = new Contacts({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    tags: req.body.tags,
                    workspace_id: req.userData.workspace_id,
                    createdBy: req.userData.user_id
                });
                contact.save()
                    .then(result => {
                        console.log("Contact added successfully");
                        res.status(200).json({
                            contact_id: result._id,
                            contact_name: result.name,
                            contact_Number: result.phoneNumber,
                            tags: result.tags,
                            workspace_id: result.workspace_id,
                            userId: result.createdBy
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    })
            }
        })

}

//edit contact-----------------------------------------------------------
exports.edit_contact = (req, res, next) => {
    const role = req.userData.role;
    const name = req.body.name;
    const tags = req.body.tags;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Contacts.findOneAndUpdate({ _id: req.params.contactId }, { $set: { name: name, tags: tags } }, { returnDocument: "after" }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No contacts found" });
            }
            console.log("Contact edited successfully");
            res.status(200).json({
                edit_name: result.name,
                edit_tags: result.tags,
                phoneNumber: result.phoneNumber
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//delete contact-----------------------------------------------------------
exports.delete_contact = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Contacts.findOneAndDelete({ _id: req.params.contactId }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No contacts found" });
            }
            console.log("Contact deleted successfully");
            res.status(200).json({
                delete_name: result.name,
                delete_tags: result.tags,
                delete_phoneNumber: result.phoneNumber
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//fetch single contact-----------------------------------------------------------
exports.fetch_single_contact = (req, res, next) => {
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Contacts.findOne({ _id: req.params.contactId }).exec()
        .then(result => {
            if (result) {
                console.log('Contact with specified id fetched');
                res.status(200).json({
                    fetched_contact: result
                })
            }
            else {
                res.status(404).json({ message: "Contact with specified id not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}