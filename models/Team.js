const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],

    // System Fields
    createdAt: { type: Date, default: Date.now },
    updatetdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Team', teamSchema);
