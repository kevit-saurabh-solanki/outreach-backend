const workspaceController = require('../controllers/workspaceController');
const reqAuth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

//create workspace
router.post('/', reqAuth, workspaceController.create_workspace);

//fetch all workspaces
router.get('/', reqAuth, workspaceController.fetch_all_workspace);

//delete workspace
router.delete('/', reqAuth, workspaceController.delete_workspace);

//edit workspace
router.put('/', reqAuth, workspaceController.edit_workspace);

module.exports = router;
