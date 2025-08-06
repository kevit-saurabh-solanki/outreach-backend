const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login_user = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).exec()
        .then(result => {
            bcrypt.compare(password, result.password, (err, passRes) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: err });
                }
                if (passRes) {
                    const token = jwt.sign(
                        {
                            user_id: result._id,
                            username: result.username,
                            email: result.email,
                            role: result.role,
                            workspace_id: result.workspace_id,
                            isAdmin: result.isAdmin,
                            createdAt: result.createdAt
                        },
                        process.env.JWT_KEY,
                        {
                            "expiresIn": "1h"
                        })
                    res.status(200).json({ message: "Authentication successful", token: token });
                }
                else {
                    res.status(401).json({ message: "wrong password" });
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}