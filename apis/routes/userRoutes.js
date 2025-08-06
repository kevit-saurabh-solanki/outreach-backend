const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const reqAuth = require('../middleware/auth');

//fetch all users
router.get('/', reqAuth, userController.all_user_fetch);

//single user fetch
router.get('/:userId', reqAuth, userController.single_user_fetch);

//add user
router.post('/', reqAuth, userController.add_user);

//edit user
router.put('/:userId', reqAuth, userController.edit_user);

//delete user
router.delete('/:userId', reqAuth, userController.delete_user);

module.exports = router;