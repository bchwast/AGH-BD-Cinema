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
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    }
});

module.exports = mongoose.model('Terms', TermSchema);
