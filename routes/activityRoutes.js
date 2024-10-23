const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/destinations/:destination_id/activities', activityController.createActivity);
router.get('/destinations/:destination_id/activities', activityController.getDestinationActivity);
router.get('/activities', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

module.exports = router;
