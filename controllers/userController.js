const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body)

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
        });

        await employee.save();

        // Generate a JWT
        const payload = {
            user: { id: user.id, },
            employee: { id: employee.id, }
        };

        // res.json({ user, employee });
        jwt.sign(
            payload,                        // The encoded data
            process.env.JWT_SECRET,        // The secret key
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller function for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user existsc
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate a JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

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
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
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
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
