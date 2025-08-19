const express = require('express');
const router = express.Router();
const reqAuth = require('../middleware/auth');
const campaignController = require('../controllers/campaignController');

//start a campaign
router.post('/', reqAuth, campaignController.add_campaign);

//get all campaigns info
router.get('/', reqAuth, campaignController.fetch_all_campaigns);

//get a single campaigns info
router.get('/:campaignId', reqAuth, campaignController.fetch_single_campaign);

//edit a campaigns info
router.get('/:campaignId', reqAuth, campaignController.edit_campaign);

//complete/delete a campaign
router.get('/campaignId', reqAuth, campaignController.delete_campaign);