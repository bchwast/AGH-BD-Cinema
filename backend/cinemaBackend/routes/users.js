const express = require('express');
const loginVerify = require('./verifyToken');
const router = express.Router();
const User = require('../models/User');
const Term = require('../models/Term');

router.get('/:id/reservations', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user.reservations);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/:id/reservations', async (req, res) => {
    try {
        const user  = await User.findById(req.params.id);
        const term = await Term.findById(req.body.term);
        if (term.freePlaces < req.body.numberOfPlaces) {
            return res.status(400).send('Not enough places');
        }
        term.freePlaces -= req.body.numberOfPlaces;
        user.reservations.push({
            customer: req.params.id,
            term: req.body.term,
            numberOfPlaces: req.body.numberOfPlaces
        });
        user.save();
        term.save();
        res.status(201).send('Created reservation');
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.put('/:user_id/reservations/:reservation_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        const term = await Term.findById(req.body.term);
        const reservation = user.reservations.id(req.params.reservation_id);
        if (term.freePlaces < -1 * reservation.numberOfPlaces + req.body.numberOfPlaces) {
            return res.status(400).send('Not enough places');
        }
        term.freePlaces -= -1 * reservation.numberOfPlaces + req.body.numberOfPlaces;
        reservation.numberOfPlaces = req.body.numberOfPlaces;
        user.save();
        term.save();
        res.status(200).send('Updated reservation');
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.delete('/:user_id/reservations/:reservation_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        const reservation = user.reservations.id(req.params.reservation_id);
        const term = Term.findById(reservation.term);
        term.freePlaces += reservation.numberOfPlaces;
        user.reservations.id(req.params.reservation_id).remove();
        user.save();
        term.save();
        res.status(200).send('Reservation deleted');
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
