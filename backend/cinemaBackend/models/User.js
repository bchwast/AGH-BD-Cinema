const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    admin: {
        type: Boolean,
        default: true
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
});

module.exports = mongoose.model('Users', UserSchema);
