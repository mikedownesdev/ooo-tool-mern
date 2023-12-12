const Team = require('../models/Team');
const Employee = require('../models/Employee');
const TimeOffRequest = require('../models/Request');

const createTimeOffRequest = async (req, res) => {
    // Implement logic to create a new time off request
    let { startDate, endDate } = req.body;
    const user = req.user;

    // Parse the dates
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Validate body

    // Find the employee record for the user
    let employee = await Employee.findOne({ user: user.id });

    // Get the default teams
    let team = await Team.findOne({ name: 'Default' });
    // let team = employee.team;

    // Create a new time off request
    try {
        const request = new TimeOffRequest({
            employee: employee._id,
            requestType: 'Time-Off Request',
            team: team._id ? team._id : null,
            startDate,
            endDate,
            managerApproval: 'Pending',
            adminApproval: 'Pending',
            createdBy: user.id,
            updatedBy: user.id,
            processed: false,
        });

        request.save()

        res.json({
            message: "success",
            data: { request }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};

const getRequestById = async (req, res) => {
    // Implement logic to get a specific time off request
    const { id } = req.params;

    try {
        const request = await TimeOffRequest.findById(id);

        res.json({
            message: "success",
            data: { request }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const modifyRequest = async (req, res) => {
    // Implement logic to update a specific time off request
    const { id } = req.params;
    const user = req.user;

    try {
        const request = await TimeOffRequest.findById(id);

        // Check if the user is authorized to update the request
        if (user.id !== request.createdBy._id.toString()) {
            return res.status(401).json({
                message: "error",
                data: { message: "You are not authorized to update this request" }
            });
        }

        // Update the request
        request.startDate = req.body.startDate;
        request.endDate = req.body.endDate;
        request.updatedBy = user.id;
        request.updatetdAt = Date.now();

        await request.save();

        res.json({
            message: "success",
            data: { request }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getMyRequests = async (req, res) => {
    // Implement logic to get all of the requests for the current user
    const user = req.user;

    try {
        // Find the employee record for the user
        let employee = await Employee.findOne({ user: user.id });

        // Find all of the time off requests for the employee
        let requests = await TimeOffRequest.find({ employee: employee._id });

        res.json({
            message: "success",
            data: { requests }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createTimeOffRequest,
    getRequestById,
    getMyRequests,
    modifyRequest,
};
