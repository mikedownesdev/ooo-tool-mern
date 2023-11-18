const Team = require('../models/Team');

// TODO: how do we handle the creation of a team with the same name?
const createTeam = async (req, res) => {
    const { name } = req.body;

    try {
        // Get the ID of the currently logged in user
        const createdBy = req.user.id;

        // Create a new team
        let team = new Team({
            name,
            createdBy,
            updatedBy: createdBy
        });

        // Save the team to the database
        await team.save();

        res.json({ msg: 'Team created successfully', team });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getAllTeams = async (req, res) => {
    try {
        // Get all teams from the database
        const teams = await Team.find();

        // Send the teams as the response
        res.json(teams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// TODO: Get Team by id, yes, but what about by name?
const getTeamById = async (req, res) => {
    try {
        // Get the team ID from the request parameters
        const teamId = req.params.id;

        // Get the team from the database
        const team = await Team.findById(teamId);

        // Check if the team exists
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Send the team as the response
        res.json(team);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// TODO: How do we handle the updating of employees list?
// Is it handled when we update the Employee to include the team ID?

// TODO: Who can update a team?
// TODO: What if they change the name of the team to one that already exists?
const updateTeam = async (req, res) => {
    const { name, employees, managers } = req.body;

    try {
        // Get the team ID from the request parameters
        const teamId = req.params.id;

        // Get the team from the database
        let team = await Team.findById(teamId);

        // Check if the team exists
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Update team's name if it's included in the request
        if (name !== undefined) {
            team.name = name;
        }

        // Update team's employees if they're included in the request
        if (employees !== undefined) {
            team.employees = employees;
        }

        // Update team's managers if they're included in the request
        if (managers !== undefined) {
            team.managers = managers;
        }

        // Update the updatedBy field with the ID of the currently logged in user
        team.updatedBy = req.user.id;

        // Save the updated team
        await team.save();

        res.json({ msg: 'Team updated successfully', team });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// TODO: Who can delete a team?
// TODO: What happens to the employees and managers of the team?
// TODO: Do we allow the deletion of a team if it has employees or managers?
// TODO: Soft delete instead and unpatch the employees and managers?
const deleteTeam = async (req, res) => {
    try {
        // Get the team ID from the request parameters
        const teamId = req.params.id;

        // Delete the team from the database
        const team = await Team.findByIdAndRemove(teamId);

        // Check if the team exists
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Send a success message as the response
        res.json({ msg: 'Team deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};
