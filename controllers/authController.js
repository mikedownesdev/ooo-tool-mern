const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../utils/password');
const { generateAccessToken, generateRefreshToken, invalidateRefreshToken } = require('../utils/auth');

// Controller function for user registration`
const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body)

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new User({
            email,
            password: hashPassword(password)
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
        };

        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        res.json({
            accessToken,
            refreshToken,
        });

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
            console.log('User not found with email: ', email)
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match')
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate a JWT
        const payload = {
            user: { id: user.id, },
        };

        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        res.json({
            accessToken,
            refreshToken,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        // Verify the refresh token
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Generate a new JWT
        const accessToken = await generateAccessToken({ user: { id: payload.user.id } });

        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(401).json({ msg: 'Invalid refresh token' });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Get the refresh token from the request
        const { refreshToken } = req.body;

        // Invalidate the refresh token in your database or cache
        // This is a placeholder code, replace it with your actual implementation
        await invalidateRefreshToken(refreshToken);

        res.json({ msg: 'User logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
}
