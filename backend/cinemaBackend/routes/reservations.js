const express = require('express');
const loginVerify = require('./verifyToken');
const router = express.Router();
const Reservation = require('../models/Reservation');
const User = require('../models/User');

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
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch(err) {
        res.status(400).json({err_message: err});
    }
})

module.exports = router
