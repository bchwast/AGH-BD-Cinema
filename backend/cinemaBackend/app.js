const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const moviesRoute = require('./routes/movies');
const termsRoute = require('./routes/terms');
const authRoute = require('./routes/auth');
const reservationsRoute = require('./routes/reservations');
app.use('/movies', moviesRoute);
app.use('/terms', termsRoute);
app.use('/auth', authRoute);
app.use('/reservations', reservationsRoute);

const cors=require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

mongoose.connect('mongodb://127.0.0.1:27017/cinemaDB', {useNewUrlParser: true}, () => console.log('connected'));

app.listen(8080);
