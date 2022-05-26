const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    movie: {
        title: {
            type: String,
            required: true
        },
        movieRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies',
            required: true
        }
    },
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
        default: false
    },
    reservations: {
        type: [ReservationSchema],
        default: []
    }
});

module.exports = mongoose.model('Users', UserSchema);
