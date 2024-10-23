const Activity = require('../models/Activity');
const Destination = require('../models/Destination');

//create  
exports.createActivity = async (req, res) => {
    try {
        const destination = await Destination.findByPk(req.params.destination_id); // Corrected to find Destination
        if (!destination) return res.status(404).json({ error: 'Destination not found' });

        const activity = await Activity.create({ 
            ...req.body, 
            destination_id: destination.destination_id }); // Associate the activity with the destination

        res.status(201).json({ message: 'An Activity successfully created', activity });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get specific activity by destination id
exports.getDestinationActivity = async (req, res) => {
    try {
        const activity = await Activity.findAll({ where: { destination_id: req.params.destination_id } });
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get all
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get by ID
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Update
exports.updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        await activity.update(req.body);
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Delete
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        await activity.destroy();
        res.json({ message: `A Activity (ID: ${req.params.id}) deleted` });
        //res.json({ message: 'An Activity deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
