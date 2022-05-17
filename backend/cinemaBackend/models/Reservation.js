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

ReservationSchema.pre('save', async function(next) {
    const term = await Term.findById(this.term);
    console.log(term);
    if (this.numberOfPlaces > term.freePlaces) {
        return next('Not enough places');
    }
    next();
});

ReservationSchema.post('save', async function(doc, next) {
    const term = await Term.findById(doc.term);
    term.reservations.push(doc._id);
    term.save();
    next();
});

ReservationSchema.pre('findOneAndUpdate', async function(next) {
    const term = await Term.findById(this.getUpdate().term);
    if (this.getUpdate().numberOfPlaces > term.freePlaces) {
        return next('Not enough places');
    }
    next();
});

ReservationSchema.post('findOneAndUpdate', async function(doc, next) {
    const term = await Term.findById(doc.term);
    term.reservations.push(doc._id);
    term.save();
    next();
});

module.exports = mongoose.model('Reservations', ReservationSchema);
