const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    ldap: { type: String, required: true },
});

module.exports = mongoose.model('Team', teamSchema);
