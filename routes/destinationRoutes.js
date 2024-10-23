const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationContoller');

router.post('/trips/:trip_id/destinations', destinationController.createDestination);
router.get('/trips/:trip_id/destinations', destinationController.getTripDestination);
router.get('/destinations', destinationController.getAllDestinations);
router.get('/destinations/:id', destinationController.getDestinationById);
router.put('/destinations/:id', destinationController.updateDestination);
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;
