const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

module.exports = mongoose.model('Team', teamSchema);
