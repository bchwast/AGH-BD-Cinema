const express = require('express');
const loginVerify = require('./verifyToken');
const router = express.Router();
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Term = require('../models/Term');

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch(err) {
        res.status(400).json({err_message: err});
    }
});

router.post('/', async (req, res) => {
    const reservation = new Reservation({
        customer: req.body.customer,
        term: req.body.term,
        numberOfPlaces: req.body.numberOfPlaces
    });
    try {
        const term = await Term.findById(reservation.term);
        if (term.freePlaces < reservation.numberOfPlaces) {
            return res.status(400).send('Not enough places');
        }
        term.freePlaces -= reservation.numberOfPlaces;
        const user = await User.findById(reservation.customer);
        user.reservations.push(reservation._id);
        reservation.save((err, saved) => {
            user.save();
            term.save();
        });
        res.status(201).json(reservation);
    } catch(err) {
        res.status(400).json({err_message: err});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        const term = await Term.findById(req.body.term);
        if (term.freePlaces < -1 * reservation.numberOfPlaces + req.body.numberOfPlaces) {
            return res.status(400).send('Not enough places');
        }
        term.freePlaces -= -1 * reservation.numberOfPlaces + req.body.numberOfPlaces;
        reservation.numberOfPlaces = req.body.numberOfPlaces;
        updatedReservation = await reservation.save();
        await term.save();
        res.status(200).json(updatedReservation);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        const term = await Term.findById(reservation.term);
        const user = await User.findById(reservation.customer);
        user.reservations.splice(user.reservations.indexOf(req.params.id, 0), 1);
        term.freePlaces += reservation.numberOfPlaces;
        await Reservation.findByIdAndDelete(req.params.id);
        await term.save();
        await user.save();
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(400).json({error_message: err});
    }
});

module.exports = router
