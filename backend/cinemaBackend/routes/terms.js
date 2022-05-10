const express = require('express');
const router = express.Router();
const Term = require('../models/Term');

router.get('/', async (req, res) => {
    try {
        const terms = await Term.find();
        res.status(200).json(terms);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/', async (req, res) => {
    const term = new Term({
        date: req.body.date,
        totalPlaces: req.body.totalPlaces,
        reservations: req.body.reservations
    });

    try {
        const savedTerm = await term.save();
        res.status(201).json(savedTerm);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const term = await Term.findById(req.params.id);
        if (term === null) {
            res.status(404).json({error_message: 'Not found'});
            return;
        }
        res.status(200).json(term);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTerm = await Term.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.status(200)
        res.json(updatedTerm);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Term.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send();
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
