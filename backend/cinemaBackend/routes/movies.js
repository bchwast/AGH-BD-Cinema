const express = require('express');
const router = express.Router();
const loginVerify = require('./verifyToken');
const Movie = require('../models/Movie');
const Term = require('../models/Term');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.admin) {
            return res.status(401).send('Access only for admin');
        }
        const post = new Movie({
            title: req.body.title,
            description: req.body.description,
            terms: req.body.terms,
            pictures: req.body.pictures
        });
        const savedMovie = await post.save();
        res.status(201).json(savedMovie);
    } catch(err) {
        console.log(err);
        res.status(400).json({error_message: err});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).exec();
        if (movie === null) {
            res.status(404).json({error_message: 'Not found'});
            return;
        }
        res.status(200).json(movie);
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
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send();
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
        const updatedMovie = await Movie.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200);
        res.json(updatedMovie);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.get('/:id/terms', async (req, res) => {
    try {
        const populatedMovie = await Movie.findById(req.params.id).populate('terms').exec();
        res.status(200).json(populatedMovie.terms);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/:id/addterm', loginVerify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.admin) {
            return res.status(401).send('Access only for admin');
        }
        const term = new Term({
            movie: req.params.id,
            date: req.body.date,
            totalPlaces: req.body.totalPlaces,
            freePlaces: req.body.totalPlaces
        });
        const movie = await Movie.findById(req.params.id);
        movie.terms.push(term._id);
        term.save();
        movie.save();
        res.status(201).send('Saved successfully');
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
