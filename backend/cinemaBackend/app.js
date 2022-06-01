const express = require('express');
const app = express();
require('dotenv').config();

const cors=require('cors');
const corsOptions ={
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT' , 'POST', 'DELETE']
}

app.use(cors(corsOptions))

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const moviesRoute = require('./routes/movies');
const termsRoute = require('./routes/terms');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
app.use('/movies', moviesRoute);
app.use('/terms', termsRoute);
app.use('/auth', authRoute);
app.use('/users', usersRoute);


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    dbName: 'cinemaDB'
}, () => console.log('connected'));
// mongoose.connect('mongodb://localhost:27017/', {
//     dbName: 'cinemaDB',
//     useNewUrlParser: true
// }, () => console.log('connected'));

app.listen(8080);
