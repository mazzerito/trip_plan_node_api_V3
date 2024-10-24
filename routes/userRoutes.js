const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload path
const upload_path = './public/images/users';

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

//routes
router.post('/users', upload.single('profile_picture'), userController.createUser);
//router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
//router.put('/users/:id', userController.updateUser);
router.put('/users/:id', upload.single('profile_picture'), userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
