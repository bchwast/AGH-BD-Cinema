const mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservations'
    }],
    freePlaces: {
        type: Number
    }
});

TermSchema.pre('save', async function(next) {
    const populated = await this.populate('reservations');
    console.log(populated);
    const reservedPlaces = populated.reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0);
    this.freePlaces = this.totalPlaces - reservedPlaces;
    if (reservedPlaces > this.totalPlaces) {
        return next('Not enough available places');
    }
    next();
});

TermSchema.pre('findOneAndUpdate', function(next) {
    const populated = this.getUpdate().populate('reservations');
    const reservedPlaces = populated.reservations.map(elem => elem.numberOfPlaces).reduce((acc, elem) => acc + elem, 0);
    this.getUpdate().freePlaces = this.totalPlaces - reservedPlaces;
    if (reservedPlaces > this.getUpdate().totalPlaces) {
        return next('Not enough available places');
    }
    next();
});

module.exports = mongoose.model('Terms', TermSchema);
