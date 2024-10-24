const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationContoller');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload path
const upload_path = './public/images/destinations';

// Ensure the upload directory exists
if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_path);  // Use the verified upload path
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

//router.post('/trips/:trip_id/destinations', destinationController.createDestination);
router.post('/trips/:trip_id/destinations', upload.single('image_url'), destinationController.createDestination);
router.get('/trips/:trip_id/destinations', destinationController.getTripDestination);
router.get('/destinations', destinationController.getAllDestinations);
router.get('/destinations/:id', destinationController.getDestinationById);
//router.put('/destinations/:id', destinationController.updateDestination);
router.put('/destinations/:id', upload.single('image_url'), destinationController.updateDestination);
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;
