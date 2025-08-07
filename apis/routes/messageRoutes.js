const messageController = require('../controllers/messageController');
const express = require('express');
const router = express.Router();

//add a message template
router.post('/', messageController.add_messageTemplate);

//get all message template
router.get('/', messageController.fetch_all_message);

//edit message template
router.put('/:messageId', messageController.edit_message);

//delete message template
router.delete('/:messageId', messageController.delete_message);


module.exports = router;