const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
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
    }
});

const ReservationSchema = mongoose.Schema({
    customer: {
        type: CustomerSchema,
        required: true
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
    console.log('hi');
    console.log(this.getUpdate().reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0));
    if (this.getUpdate().reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0) > this.getUpdate().totalPlaces) {
        return next('Not enough available places');
    }
    next();
});

module.exports = mongoose.model('Terms', TermSchema);