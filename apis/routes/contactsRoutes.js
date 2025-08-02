const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const checkAuth = require('../middleware/auth');

//get all contacts
router.get('/', checkAuth, contactsController.fetch_all_contacts);

//add contacts
router.post('/', checkAuth, contactsController.add_contact);

//edit contacts
router.put('/', checkAuth, contactsController.edit_contact);

//delete contacts
router.delete('/', checkAuth, contactsController.delete_contact);

module.exports = router;
