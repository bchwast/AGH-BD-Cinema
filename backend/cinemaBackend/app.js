const express = require('express');
const app = express();
require('dotenv').config();

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

const cors=require('cors');
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     dbName: 'cinemaDB'
// }, () => console.log('connected'));
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'cinemaDB',
    useNewUrlParser: true
}, () => console.log('connected'));

app.listen(8080);
