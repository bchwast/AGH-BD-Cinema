const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/', async (req, res) => {
    try {
        const post = new Movie({
            title: req.body.title,
            description: req.body.description,
            terms: req.body.terms
        });
        const savedMovie = await post.save();
        res.status(201).json(savedMovie);
    } catch(err) {
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

router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send();
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.put('/:id', async (req, res) => {
    try {
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

module.exports = router;
