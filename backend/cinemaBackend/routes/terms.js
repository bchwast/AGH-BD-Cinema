const express = require('express');
const loginVerify = require('./verifyToken');
const router = express.Router();
const Term = require('../models/Term');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const terms = await Term.find();
        res.status(200).json(terms);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/', loginVerify, async (req, res) => {
    const term = new Term({
        date: req.body.date,
        totalPlaces: req.body.totalPlaces,
        reservations: req.body.reservations
    });

    try {
        const user = await User.findById(req.user._id);
        if (!user.admin) {
            return res.status(401).send('Access only for admin');
        }
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

router.put('/:id', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.admin) {
            return res.status(401).send('Access only for admin');
        }
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

router.delete('/:id', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.admin) {
            return res.status(401).send('Access only for admin');
        }
        await Term.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send();
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.put('/:id/addreservation', loginVerify, async (req, res) => {
    try {
        const term = await Term.findById(req.params.id);
        if (req.user._id != term.customer) {
            return res.status(401).send('No access');
        }
        term.reservations.push({
            customer: req.body.customer,
            numberOfPlaces: req.body.numberOfPlaces
        });
        const updatedTerm = await term.save();
        res.status(200).json(updatedTerm);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
