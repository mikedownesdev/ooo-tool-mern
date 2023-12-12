const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middleware/auth');

// Create a Time Off Request
router.post('/', authMiddleware, requestController.createTimeOffRequest);

// Get user's requests, both ones they've filed and once's they're managing
router.get('/me', authMiddleware, requestController.getMyRequests);

// Get a Specific Time Off Request
router.get('/:id', authMiddleware, requestController.getRequestById);

// // Update a Time Off Request
router.put('/:id', authMiddleware, requestController.modifyRequest);

// // // Delete a Time Off Request
// router.delete('/:id', authMiddleware, requestController.deleteTimeOffRequest);

// // // Approve a Time Off Request (for managers)
// router.put('/:id/approve', authMiddleware, requestController.approveTimeOffRequest);

// // // Reject a Time Off Request (for managers)
// router.put('/:id/reject', authMiddleware, requestController.rejectTimeOffRequest);

// // // List Time Off Requests for a Specific Employee
// router.get('/employees/:employeeId/requests', authMiddleware, requestController.getTimeOffRequestsForEmployee);

// // List Time Off Requests by Status
// router.get('/requests', authMiddleware, requestController.getTimeOffRequestsByStatus);

// // Filter Time Off Requests by Date Range
// router.get('/requests', authMiddleware, requestController.getTimeOffRequestsByDateRange);

module.exports = router;
