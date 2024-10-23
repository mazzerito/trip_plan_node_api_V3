const Destination = require('../models/Destination');
const Trip = require('../models/Trip');

//create
exports.createDestination = async (req, res) => {
    try {
        const trip = await Trip.findByPk(req.params.trip_id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });

        const destination = await Destination.create({
            ...req.body,
            trip_id: req.params.trip_id
        });

        res.status(201).json({ message: 'A Destination successfully created', destination });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// exports.createDestination = async (req, res) => {
//     try {
//         const trip = await Trip.findByPk(req.params.trip_id);
//         if (!trip) {
//             return res.status(404).json({ error: 'Trip not found' });
//         }
//         const destination = await Destination.create(req.body);
//         res.status(201).json({ 
//             message: 'A Destination successfully created', 
//             destination: destination,
//         });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
//get specific destination by trip id
exports.getTripDestination = async (req, res) => {
    try {
        const destinations = await Destination.findAll({ where: { trip_id: req.params.trip_id } });
        res.json(destinations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get all
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get by ID
exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Update
exports.updateDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        await destination.update(req.body);
        res.status(200).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete
exports.deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        await destination.destroy();
        res.json({ message: `A Destination (ID: ${req.params.id}) deleted` }); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
