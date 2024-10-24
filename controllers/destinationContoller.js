const Destination = require('../models/Destination');
const Trip = require('../models/Trip');

//create
// exports.createDestination = async (req, res) => {
//     try {
//         const trip = await Trip.findByPk(req.params.trip_id);
//         if (!trip) return res.status(404).json({ error: 'Trip not found' });

//         const destination = await Destination.create({
//             ...req.body,
//             trip_id: req.params.trip_id
//         });

//         res.status(201).json({ message: 'A Destination successfully created', destination });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

//Create destination
exports.createDestination = async (req, res) => {
    try {
        // Check if the trip exists
        const trip = await Trip.findByPk(req.params.trip_id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });

        // Handle image file (if uploaded)
        const image_file_name = req.file ? req.file.filename : null;

        // Create the destination
        const destination = await Destination.create({
            ...req.body,
            trip_id: req.params.trip_id,
            image_url: image_file_name ? `/public/images/destinations/${image_file_name}` : null // Store image path or URL
        });

        res.status(201).json({
            message: 'A Destination successfully created',
            destination
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
// exports.updateDestination = async (req, res) => {
//     try {
//         const destination = await Destination.findByPk(req.params.id);
//         if (!destination) {
//             return res.status(404).json({ message: 'Destination not found' });
//         }
//         await destination.update(req.body);
//         res.status(200).json(destination);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

//UpdateV2
// Update destination
exports.updateDestination = async (req, res) => {
    try {
        // Check if the trip exists
        const trip = await Trip.findByPk(req.params.trip_id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });

        // Check if the destination exists
        const destination = await Destination.findByPk(req.params.destination_id);
        if (!destination) return res.status(404).json({ error: 'Destination not found' });

        // Handle image file (if uploaded)
        const image_file_name = req.file ? req.file.filename : destination.image_url;

        // Update the destination
        await destination.update({
            ...req.body,
            image_url: image_file_name ? `/public/images/destinations/${image_file_name}` : destination.image_url // Keep old image if not updated
        });

        res.status(200).json({
            message: 'Destination successfully updated',
            destination
        });
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
