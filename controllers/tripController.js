const Trip = require('../models/Trip');
const User = require('../models/User');

//create a trip for spcific user
exports.createTrip = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const tripUser = await user.createTrip(req.body);
        //const trip = await Trip.create(req.body);
        res.status(201).json({ 
            message: 'A Trip successfully created', 
            tripUser: tripUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//get a specific trip user
// exports.getUserTrips = async (req, res) => {
//     try {
//         // Fetch all trips where the user_id matches the req.params.userId
//         const trips = await Trip.findAll({ where: { user_id: req.params.user_id } });
        
//         if (!trips.length) {
//             return res.status(404).json({ message: 'No trips found for this user' });
//         }

//         res.status(200).json(trips);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
//get specific trip by user id
exports.getUserTrip = async (req, res) => {
    try {
        const trip = await Trip.findAll({ where: { user_id: req.params.user_id } });
        res.json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//get all
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll();
        res.status(200).json(trips);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get by ID
exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Update
exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        await trip.update(req.body);
        res.status(200).json(trip);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        await trip.destroy();
        res.json({ message: `A Trip (ID: ${req.params.id}) deleted` }); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
