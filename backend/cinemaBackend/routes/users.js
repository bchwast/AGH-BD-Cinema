const express = require('express');
const loginVerify = require('./verifyToken');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/User');
const Term = require('../models/Term');
const Movie = require('../models/Movie');

router.get('/:id/reservations', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user._id != req.params.id && !user.admin) {
            return res.status(401).send('Access denied');
        }
        res.status(200).json(user.reservations);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/:id/reservations', loginVerify, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user  = await User.findById(req.params.id);
        if (user._id != req.params.id && !user.admin) {
            return res.status(401).send('Access denied');
        }
        const term = await Term.findById(req.body.term);
        if (term.freePlaces < req.body.numberOfPlaces) {
            return res.status(400).send('Not enough places');
        }
        term.freePlaces -= req.body.numberOfPlaces;
        const movieFound = await Movie.findById(term.movie);
        user.reservations.push({
            movie: {
                title: movieFound.title,
                movieRef: movieFound._id
            },
            customer: req.params.id,
            term: req.body.term,
            numberOfPlaces: req.body.numberOfPlaces
        });
        user.save();
        term.save();
        await session.commitTransaction();
        session.endSession();
        res.status(201).send('Created reservation');
    } catch(err) {
        session.abortTransaction();
        session.endSession();
        res.status(400).json({error_message: err});
    }
});

router.put('/:user_id/reservations/:reservation_id', loginVerify, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(req.params.user_id);
        if (user._id != req.params.user_id && !user.admin) {
            return res.status(401).send('Access denied');
        }
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
        console.log(err);
        session.abortTransaction();
        session.endSession();
        res.status(400).json({error_message: err});
    }
});

router.delete('/:user_id/reservations/:reservation_id', loginVerify, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(req.params.user_id);
        if (user._id != req.user._id && !user.admin) {
            return res.status(401).send('Access denied');
        }
        const reservation = user.reservations.id(req.params.reservation_id);
        const term = await Term.findById(reservation.term);
        console.log(reservation)
        term.freePlaces += reservation.numberOfPlaces;
        user.reservations.id(req.params.reservation_id).remove();
        user.save();
        term.save();
        res.status(200).send('Reservation deleted');
    } catch(err) {
        session.abortTransaction();
        session.endSession();
        res.status(400).json({error_message: err});
    }
});

router.get('/:id', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user._id != req.user._id && !user.admin) {
            return res.status(401).send('Access denied');
        }
        res.status(200).json(user);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.get('/', loginVerify, async (req, res) => {
    try {
        const users = await User.find();
        const verifiedUser = users.filter(user => user._id == req.user._id)[0];
        if (!verifiedUser.admin) {
            return res.status(401).send('Access denied');
        }
        res.status(200).json(users);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
