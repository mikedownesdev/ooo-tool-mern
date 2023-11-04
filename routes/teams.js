const express = require('express');
const router = express.Router();

// Import the team controller methods
const {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController');

// Import the auth middleware
const authMiddleware = require('../middleware/auth');

// Create a Team
router.post('/', authMiddleware, createTeam);

// Get All Teams
router.get('/', authMiddleware, getAllTeams);

// Get a Specific Team
router.get('/:id', authMiddleware, getTeamById);

// Update a Team
router.put('/:id', authMiddleware, updateTeam);

// Delete a Team
router.delete('/:id', authMiddleware, deleteTeam);

module.exports = router;
