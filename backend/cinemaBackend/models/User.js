const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    term: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terms',
        required: true
    },
    numberOfPlaces: {
        type: Number,
        required: true
    }
});

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
    reservations: {
        type: [ReservationSchema],
        default: []
    }
});

module.exports = mongoose.model('Users', UserSchema);
