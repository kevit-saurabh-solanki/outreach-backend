const messageController = require('../controllers/messageController');
const express = require('express');
const router = express.Router();
const reqAuth = require('../middleware/auth');

//add a message template
router.post('/', reqAuth, messageController.add_messageTemplate);

//get all message template
router.get('/', reqAuth, messageController.fetch_all_message);

//edit message template
router.put('/:messageId', reqAuth, messageController.edit_message);

//delete message template
router.delete('/:messageId', reqAuth, messageController.delete_message);


module.exports = router;