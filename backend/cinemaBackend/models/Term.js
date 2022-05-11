const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    numberOfPlaces: {
        type: Number,
        required: true
    }
});

const TermSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    totalPlaces: {
        type: Number,
        required: true
    },
    reservations: [{
        type: ReservationSchema,
        required: true
    }]
});

TermSchema.pre('save', function(next) {
    if (this.reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0) > this.totalPlaces) {
        return next('Not enough available places');
    }
    next();
});

TermSchema.pre('findOneAndUpdate', function(next) {
    if (this.getUpdate().reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0) > this.getUpdate().totalPlaces) {
        return next('Not enough available places');
    }
    next();
});

module.exports = mongoose.model('Terms', TermSchema);
