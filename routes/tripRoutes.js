const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/users/:user_id/trips', tripController.createTrip);
router.get('/users/:user_id/trips', tripController.getUserTrip);
router.get('/trips', tripController.getAllTrips);
router.get('/trips/:id', tripController.getTripById);
router.put('/trips/:id', tripController.updateTrip);
router.delete('/trips/:id', tripController.deleteTrip);

module.exports = router;
