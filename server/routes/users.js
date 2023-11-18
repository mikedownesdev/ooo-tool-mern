const express = require('express');
const router = express.Router();

// Import the user controller
const {
    getUserProfile,
    updateUserProfile
} = require('../controllers/userController');

// Import the auth middleware
const authMiddleware = require('../middleware/auth');

// Apply the auth middleware to the routes that require authentication
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
