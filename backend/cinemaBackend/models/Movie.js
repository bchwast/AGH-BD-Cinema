const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    terms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terms'
    }]
});

module.exports = mongoose.model('Movies', MovieSchema);