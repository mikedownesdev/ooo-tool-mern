const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    requestType: { type: String, enum: ["Time-Off Request", "Overtime Request"], required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    ptoHours: { type: Number, min: 0, required: false },
    utoHours: { type: Number, min: 0, required: false },
    otHours: { type: Number, min: 0, required: false },
    notes: { type: String, required: true },
    managerApproval: { type: String, enum: ['Approved', 'Denied', 'Pending', 'Not Needed'], required: true },
    adminApproval: { type: String, enum: ['Approved', 'Denied', 'Admin Approval Pending', 'Not Needed', 'Manager Approval Pending'], required: true },
    Processed: { type: Boolean, required: true },

    // System Fields
    createdAt: { type: Date, default: Date.now },
    updatetdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Team', teamSchema);
