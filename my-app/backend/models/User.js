const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensuring unique emails
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // ✅ Corrected: Now used as a function
    }
});

// ✅ Capitalized model name to 'User'
module.exports = mongoose.model('User', UserSchema);
