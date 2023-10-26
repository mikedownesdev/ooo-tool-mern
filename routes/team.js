const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Create a Team
router.post('/teams', teamController.createTeam);

// Get All Teams
router.get('/teams', teamController.getAllTeams);

// Get a Specific Team
router.get('/teams/:id', teamController.getTeamById);

// Update a Team
router.put('/teams/:id', teamController.updateTeam);

// Delete a Team
router.delete('/teams/:id', teamController.deleteTeam);

module.exports = router;
