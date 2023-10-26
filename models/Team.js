const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
});

module.exports = mongoose.model('Team', teamSchema);
