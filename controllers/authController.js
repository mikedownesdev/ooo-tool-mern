const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../utils/password');
const {
    generateAccessToken,
    generateRefreshToken,
    calculateExpiryDate,
    invalidateRefreshToken,
} = require('../utils/auth');

// Controller function for user registration`
const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // Start a new session to enable atomic transactions
    const session = await mongoose.startSession();

    try {
        // Start a the user creation transaction
        session.startTransaction();

        // Check if the user already exists
        let user = await User.findOne({ email }).session(session);
        if (user) {
            throw new Error('User already exists');
        }

        // Create a new user
        user = new User({
            email,
            password: await hashPassword(password)
        });

        await user.save({ session });

        // Create a new employee linked to the user
        const employee = new Employee({
            user: user._id,
            firstName,
            lastName,
        });

        await employee.save({ session });

        // Generate a JWT
        const payload = {
            user: { id: user.id, },
        };

        const accessToken = await generateAccessToken(payload);
        const refreshToken = await generateRefreshToken(payload);

        const storedToken = new RefreshToken({
            token: refreshToken,
            user: user._id,
            expires: calculateExpiryDate(7)
        });

        await storedToken.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        res.json({
            message: "success",
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                }
            }
        });

    } catch (err) {
        // Abort the transaction if any errors occur
        await session.abortTransaction();

        console.error(err);
        res.status(500).send('Server error');
    } finally {
        // End the session to release resources
        session.endSession();
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

        // Invalidate the old refresh token
        const oldRefreshToken = await RefreshToken.findOne({ user: user._id });
        if (oldRefreshToken) {
            await invalidateRefreshToken(oldRefreshToken.token);
        }

        // Persist the new refresh token
        await RefreshToken.create({ token: refreshToken, user: user._id, expires: calculateExpiryDate(7) });

        res.json({
            message: "success",
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                }
            }
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
        const storedToken = await RefreshToken.findOne({ token: refreshToken });

        if (!storedToken) {
            console.error('Refresh token not found in database');
            throw new Error('Invalid refresh token');
        }
        if (storedToken.user.toString() !== payload.user.id) {
            console.error('User ID in refresh token payload does not match user ID in database');
            throw new Error('Invalid refresh token');
        }
        if (storedToken.expires < Date.now()) {
            console.error('Refresh token has expired');
            throw new Error('Invalid refresh token');
        }

        // Generate a new JWT
        const accessToken = await generateAccessToken({ user: { id: payload.user.id } });

        res.json({ accessToken });
    } catch (err) {
        console.error('Error in refreshToken function:', err);
        res.status(401).json({ msg: 'Invalid refresh token' });
    }
}

const logoutUser = async (req, res) => {
    try {
        // Get the refresh token from the request
        const { refreshToken } = req.body;

        // Invalidate the refresh token by deleting it from the database
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
