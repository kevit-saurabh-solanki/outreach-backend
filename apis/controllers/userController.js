const User = require('../models/userModel');

//fetch all users
exports.all_user_fetch = (req, res, next) => {
    User.find().exec()
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

//fetch user by email
exports.single_user_fetch = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email: email }).exec()
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
                res.status(404).json({ message: "User with specified mail not found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(err.status || 500).json({
                error: err
            });
        })
};

//delete user
exports.delete_user = (req, res, next) => {
    const email = req.body.email;
    User.findOneAndDelete({ email: email }).exec()
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

//edit user
exports.edit_user = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const workspace_id = req.body.workspace_id;
    User.findOneAndUpdate({ email: email }, { $set: { username: username, email: email, password: password, role: role, workspace_id: workspace_id  } }, { returnDocument: after }).exec()
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