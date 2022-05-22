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
    freePlaces: {
        type: Number
    }
});

module.exports = mongoose.model('Terms', TermSchema);
