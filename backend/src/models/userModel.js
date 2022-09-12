const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3 },
    email: { type: String, required: true, min: 3 },
    password: { type: String, required: true, min: 6 },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);