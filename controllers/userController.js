const User = require('../models/User');
const { hashPassword } = require('../utils/password');

// Controller function to get user profile
const getUserProfile = async (req, res) => {
    try {
        // Get user from database
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller function to update user profile
const updateUserProfile = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Get user from database
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user's email and password
        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = hashPassword(password);
        }

        // Save the updated user
        await user.save();

        res.json({ msg: 'User profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Export the controller functions
module.exports = {
    getUserProfile,
    updateUserProfile,
};
