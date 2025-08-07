const workspaceController = require('../controllers/workspaceController');
const reqAuth = require('../middleware/auth');
const express = require('express');
const { route } = require('./userRoutes');
const router = express.Router();

//create workspace
router.post('/', reqAuth, workspaceController.create_workspace);

//fetch all workspaces
router.get('/', reqAuth, workspaceController.fetch_all_workspace);

//fetch workspace by id
router.get('/:workspaceId', reqAuth, workspaceController.fetch_single_workspace);

//delete workspace
router.delete('/:workspaceId', reqAuth, workspaceController.delete_workspace);

//edit workspace
router.put('/:workspaceId', reqAuth, workspaceController.edit_workspace);

module.exports = router;
