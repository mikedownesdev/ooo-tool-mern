const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    // Add other user-related fields as needed

    // System Fields
    createdAt: { type: Date, default: Date.now },
    updatetdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
