const Workspace = require('../models/workspaceModel');
const mongoose = require('mongoose');


//create workspace-------------------------------------------------------------------------
exports.create_workspace = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Workspace.findOne({ _id: req.body._id }).exec()
        .then(result => {
            if (result) return res.status(409).json({ message: "workspace already existed with specified id" });
            const workspace = new Workspace({
                _id: req.body._id,
                name: req.body.name,
                description: req.body.description,
                createdAt: new Date().toISOString()
            });
            workspace.save()
                .then(result => {
                    console.log('Workspace created');
                    res.status(200).json({
                        workspace_id: result._id,
                        workspace_name: result.name,
                        workspace_description: result.description,
                        createdAt: result.createdAt
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                })


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}

//fetch all workspace-------------------------------------------------------------------------
exports.fetch_all_workspace = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Workspace.find().exec()
        .then(result => {
            console.log('All workspaces fetched');
            res.status(200).json({
                fetched_workspaces: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//delete workspace-------------------------------------------------------------------------
exports.delete_workspace = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Workspace.findOne({ _id: req.params.workspaceId }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No workspace found" });
            }
            Workspace.deleteOne({ _id: req.params.workspaceId }).exec()
                .then(delWork => {
                    console.log('workspace deleted');
                    res.status(200).json({ deleted_workspace: result.name });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ error: err });
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//edit workspace-------------------------------------------------------------------------
exports.edit_workspace = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }

    Workspace.findOneAndUpdate({ _id: req.params.workspaceId }, { $set: { name: req.body.name, description: req.body.description } }, { returnDocument: "after" }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No workspace found" });
            }
            console.log("worksapce edited successfully");
            res.status(200).json({
                edit_name: result.name,
                edit_description: result.description
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}