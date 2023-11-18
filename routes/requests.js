const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Create a Time Off Request
router.post('/requests', requestController.createTimeOffRequest);

// List All Time Off Requests
router.get('/requests', requestController.getAllTimeOffRequests);

// Get a Specific Time Off Request
router.get('/requests/:id', requestController.getSingleTimeOffRequest);

// Update a Time Off Request
router.put('/requests/:id', requestController.updateTimeOffRequest);

// Delete a Time Off Request
router.delete('/requests/:id', requestController.deleteTimeOffRequest);

// Approve a Time Off Request (for managers)
router.put('/requests/:id/approve', requestController.approveTimeOffRequest);

// Reject a Time Off Request (for managers)
router.put('/requests/:id/reject', requestController.rejectTimeOffRequest);

// List Time Off Requests for a Specific Employee
router.get('/employees/:employeeId/requests', requestController.getTimeOffRequestsForEmployee);

// List Time Off Requests by Status
router.get('/requests', requestController.getTimeOffRequestsByStatus);

// Filter Time Off Requests by Date Range
router.get('/requests', requestController.getTimeOffRequestsByDateRange);

module.exports = router;
