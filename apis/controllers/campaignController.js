const Campaign = require('../models/campaignModel');
const mongoose = require('mongoose');
const { edit_message } = require('./messageController');

//add / start a campaign-------------------------------------------------------------------------
exports.add_campaign = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    const campaign = new Campaign({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        message: req.body.message,
        targetTags: req.body.targetTags,
        status: req.body.status,
        workspaceId: req.userData.workspace_id,
        createdBy: req.userData.user_id,
        createdAt: new Date().toISOString()
    });
    campaign.save()
        .then(result => {
            console.log("Campaign started successfully");
            res.status(200).json({
                campaign_id: result._id,
                campaign_name: result.name,
                targetTags: result.targetTags,
                status: result.status,
                workspace_id: result.workspace_id,
                createdBy: result.createdBy
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

}

//fetch all campaigns-------------------------------------------------------------------------
exports.fetch_all_campaigns = (req, res, next) => {
    Campaign.find().exec()
        .then(result => {
            console.log('All campaigns fetched');
            res.status(200).json({
                Campaigns: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}

//edit a campaign info-------------------------------------------------------------------------
exports.edit_campaign = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Campaign.findOneAndUpdate({ _id: req.params.campaignId }, { $set: { name: req.body.name, message: req.body.message, targetTags: req.body.targetTags, status: req.body.status } }, { returnDocument: "after" }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No campaign found" });
            }
            console.log("Campaign edited successfully");
            res.status(200).json({
                edit_name: result.name,
                edit_message: result.message,
                edit_targetTags: result.targetTags,
                campaign_status: result.status
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//delete campaign -------------------------------------------------------------------------
exports.delete_campaign = (req, res, next) => {
    const role = req.userData.role;
    if (role === 'viewer') {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    Campaign.findOneAndDelete({ _id: req.params.campaignId }).exec()
        .then(result => {
            if (result === null) {
                return res.status(404).json({ message: "No campaign found" });
            }
            console.log("campaign deleted successfully");
            res.status(200).json({
                deleted_campaign: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        })
}

//fetch single campaign info-----------------------------------------------------------
exports.fetch_single_campaign = (req, res, next) => {
    Campaign.findOne({ _id: req.params.campaignId }).exec()
        .then(result => {
            if (result) {
                console.log('Campaign with specified id fetched');
                res.status(200).json({
                    fetched_campaign: result
                })
            }
            else {
                res.status(404).json({ message: "Campaign with specified id not found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
}
