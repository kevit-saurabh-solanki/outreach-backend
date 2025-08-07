const WorkspaceUser = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Workspace = require('../models/workspaceModel');

//fetch all users-------------------------------------------------------------------------
exports.all_user_fetch = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    WorkspaceUser.find().exec()
        .then(result => {
            console.log('All users fetched successfully')
            res.status(200).json({
                fetchedUsers: result.map(user => {
                    return {
                        user_id: user._id,
                        username: user.username,
                        user_email: user.email,
                        user_role: user.role,
                        user_workspace: user.workspace_id
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({
                error: err
            })
        })
};

//fetch user by id-------------------------------------------------------------------------
exports.single_user_fetch = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    WorkspaceUser.findOne({ _id: req.params.userId }).exec()
        .then(result => {
            if (result) {
                console.log("User fetched");
                res.status(200).json({
                    user_id: result._id,
                    username: result.username,
                    user_email: result.email,
                    user_role: result.role,
                    user_workspace: result.workspace_id
                });
            }
            else {
                res.status(404).json({ message: "User with specified id not found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({
                error: err
            });
        })
};

//add users-------------------------------------------------------------------------
exports.add_user = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    WorkspaceUser.findOne({ $and: [{ email: req.body.email }, { workspace_id: req.body.workspace_id }] }).exec()
        .then(result => {
            if (result) {
                return res.status(409).json({ message: "user with specified mail and workspace id already existed" })
            }
            else {
                Workspace.findOne({ _id: req.body.workspace_id }).exec()
                    .then(result => {
                        if (result === null) {
                            return res.status(404).json({ message: "workspace with specified id not found" });
                        }
                        else {
                            bcrypt.hash(req.body.password, 10, (e, hash) => {
                                if (e) {
                                    console.log(e);
                                    return res.status(500).json({
                                        error: e
                                    });
                                }
                                else {
                                    const user = new WorkspaceUser({
                                        _id: new mongoose.Types.ObjectId(),
                                        username: req.body.username,
                                        email: req.body.email,
                                        password: hash,
                                        role: req.body.role,
                                        workspace_id: req.body.workspace_id,
                                        isAdmin: req.body.isAdmin,
                                        createdAt: new Date().toISOString()
                                    });
                                    user.save()
                                        .then(result => {
                                            console.log("user added successfully");
                                            res.status(200).json({
                                                username: result.username,
                                                email: result.email,
                                                password: result.password,
                                                role: result.role
                                            })
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json({ error: err });
                                        })
                                }
                            })

                        }
                    })
            }
        })

}

//delete user-------------------------------------------------------------------------
exports.delete_user = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    WorkspaceUser.findOneAndDelete({ _id: req.params.userId }).exec()
        .then(result => {
            if (result) {
                console.log("User deleted");
                res.status(200).json({
                    deleted_user_id: result._id,
                    deleted_username: result.username,
                    deleted_user_email: result.email,
                    deleted_user_workspace: result.workspace_id
                });
            }
            else {
                res.status(404).json({ message: "User not found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({
                error: err
            });
        })
}

//edit user-------------------------------------------------------------------------
exports.edit_user = (req, res, next) => {
    const admin = req.userData.isAdmin;
    if (!admin) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const workspace_id = req.body.workspace_id;
    Workspace.findOne({ _id: req.body.workspace_id }).exec()
        .then(r => {
            if (r === null) {
                return res.status(404).json({ message: "workspace with specified id not found" });
            }
            else {
                WorkspaceUser.findOneAndUpdate({ _id: req.params.userId }, { $set: { username: username, email: email, password: password, role: role, workspace_id: workspace_id } }, { returnDocument: "after" }).exec()
                    .then(result => {
                        console.log("User updated");
                        if (result) {
                            res.status(200).json({
                                updated_user_id: result._id,
                                updated_username: result.username,
                                updated_user_email: result.email,
                                updated_user_workspace: result.workspace_id
                            });
                        }
                        else {
                            res.status(404).json({ message: "User not found" })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(err.status || 500).json({
                            error: err
                        });
                    })
            }
        })
        .catch(e => {
            res.status(500).json({ error: e });
        })

}