const Booking = require('../models/Booking');
const Trip = require('../models/Trip');

//create
//create specific booking
exports.createBooking = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.trip_id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const newBooking = await Booking.create({
            ...req.body,
            trip_id: req.params.trip_id // Associate booking with the trip
        });

        res.status(201).json({ message: 'A Booking successfully created', newBooking }); // Respond with the newly created booking
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// exports.createBooking = async (req, res) => {
//     try {
//         const trip = await Trip.findByPk(req.params.trip_id);
//         if (!trip) {
//             return res.status(404).json({ error: 'Trip not found' });
//         }
//         const tripBooking = await Trip.createBooking(req.body);
//         //const booking = await Booking.create(req.body);
//         res.status(201).json({ 
//             message: 'A Booking successfully created', 
//             //booking: booking,
//             tripBooking: tripBooking
//         });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

//get specific booking by trip id
exports.getTripBooking = async (req, res) => {
    try {
        const bookings = await Booking.findAll({ where: { trip_id: req.params.trip_id } });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get all
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Update
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.update(req.body);
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.destroy();
        res.json({ message: `A Booking (ID: ${req.params.id}) deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
