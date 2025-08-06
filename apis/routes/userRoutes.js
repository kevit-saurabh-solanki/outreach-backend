const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

//fetch all users
router.get('/', userController.all_user_fetch);

//single user fetch
router.get('/:email', userController.single_user_fetch);

//add user
router.post('/', userController.add_user);

//edit user
router.put('/', userController.edit_user);

//delete user
router.delete('/', userController.delete_user);

module.exports = router;