const express = require('express');
const router = express.Router();

// Import the user controller
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController');

// Import the auth middleware
const authMiddleware = require('../middleware/auth');

// Define routes for user management
router.post('/register', registerUser);
router.post('/login', loginUser);

// Apply the auth middleware to the routes that require authentication
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
