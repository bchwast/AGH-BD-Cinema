const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const moviesRoute = require('./routes/movies');
const termsRoute = require('./routes/terms');
app.use('/movies', moviesRoute);
app.use('/terms', termsRoute)

app.get('/', (req, res) => {
    res.send('home endpoint');
});

mongoose.connect('mongodb://127.0.0.1:27017/cinemaDB', {useNewUrlParser: true}, () => console.log('connected'));

app.listen(8080);
