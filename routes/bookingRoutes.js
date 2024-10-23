const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/trips/:trip_id/bookings', bookingController.createBooking);
router.get('/trips/:trip_id/bookings', bookingController.getTripBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
