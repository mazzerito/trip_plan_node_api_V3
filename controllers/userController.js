const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
    try {
        // Extract image file name if it exists
        const image_file_name = req.file ? req.file.filename : null;
        
        const { user_name, email, password } = req.body;

        // Create user with required fields
        const user = await User.create({
            user_name,
            email,
            password,
            profile_picture: image_file_name
        });

        res.status(201).json({
            message: 'A User successfully created',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Select All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Select User by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User
// exports.updateUser = async (req, res) => {
//     try {
//         const user = await User.update(req.body, {
//             where: { user_id: req.params.id }
//         });
//         res.status(200).json({ message: 'User updated' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.updateUser = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;
        
        // Find the user by ID (assuming ID is passed as a URL parameter)
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a new file is uploaded
        const image_file_name = req.file ? req.file.filename : user.profile_picture;

        // Update the user record
        await user.update({
            user_name: user_name || user.user_name, 
            email: email || user.email,            
            password: password || user.password,  
            profile_picture: image_file_name       
        });

        res.status(200).json({
            message: 'User updated successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { user_id: req.params.id } });
        res.json({ message: `A User (ID: ${req.params.id}) deleted` }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
