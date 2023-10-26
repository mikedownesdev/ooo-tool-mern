const express = require('express');
const router = express.Router();
const timeoffController = require('../controllers/requestController');

// Create a Time Off Request
router.post('/requests', timeoffController.createTimeOffRequest);

// List All Time Off Requests
router.get('/requests', timeoffController.getAllTimeOffRequests);

// Get a Specific Time Off Request
router.get('/requests/:id', timeoffController.getSingleTimeOffRequest);

// Update a Time Off Request
router.put('/-requests/:id', timeoffController.updateTimeOffRequest);

// Delete a Time Off Request
router.delete('/requests/:id', timeoffController.deleteTimeOffRequest);

// Approve a Time Off Request (for managers)
router.put('/requests/:id/approve', timeoffController.approveTimeOffRequest);

// Reject a Time Off Request (for managers)
router.put('/requests/:id/reject', timeoffController.rejectTimeOffRequest);

// List Time Off Requests for a Specific Employee
router.get('/employees/:employeeId/requests', timeoffController.getTimeOffRequestsForEmployee);

// List Time Off Requests by Status
router.get('/requests', timeoffController.getTimeOffRequestsByStatus);

// Filter Time Off Requests by Date Range
router.get('/requests', timeoffController.getTimeOffRequestsByDateRange);

module.exports = router;
