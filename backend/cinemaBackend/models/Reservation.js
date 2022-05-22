const mongoose = require('mongoose');
const Term = require('./Term');

const ReservationSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    term: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terms'
    },
    numberOfPlaces: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reservations', ReservationSchema);
