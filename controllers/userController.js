const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

/**
 * Registers a new User and creates a new Employee linked to that user.
 *
 * @async
 * @function registerUser
 * @param {Object} req - Express.js request object.
 * @param {Object} req.body - The request's body.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - Express.js response object.
 * @returns {Promise<void>} - A Promise that resolves when the function has completed.
 * @throws {Error} - If the username already exists or if there's a server error.
 */
const registerUser = async (req, res) => {
    const { email, password, firstName, lastName, team, salaried } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        // Create a new employee linked to the user
        const employee = new Employee({
            user: user._id,
            firstName,
            lastName,
            team,
            salaried,
        });

        await employee.save();

        res.json({ user, employee });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller function for user login
const loginUser = (req, res) => {
    // Implement user login logic here
};

// Controller function to get user profile
const getUserProfile = (req, res) => {
    // Implement user profile retrieval logic here
};

// Controller function to update user profile
const updateUserProfile = (req, res) => {
    // Implement user profile update logic here
};

// Export the controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
