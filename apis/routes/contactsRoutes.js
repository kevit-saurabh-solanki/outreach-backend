const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const checkAuth = require('../middleware/auth');

//get all contacts
router.get('/', checkAuth, contactsController.fetch_all_contacts);

//add contacts
router.post('/', checkAuth, contactsController.add_contact);

//fetch single contact
router.post('/:contactId', checkAuth, contactsController.fetch_single_contact);

//edit contacts
router.put('/:contactId', checkAuth, contactsController.edit_contact);

//delete contacts
router.delete('/:contactId', checkAuth, contactsController.delete_contact);

module.exports = router;
