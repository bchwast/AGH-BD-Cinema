const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../authValidation');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const userWithEmail = await User.findOne({email: req.body.email});
    if (userWithEmail) {
        return res.status(400).send('Email already occupied');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        // res.header("Access-Control-Allow-Origin", "*");
        res.status(201).json({user: user._id});
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {
        expiresIn: '5h'
    });

    // res.header("Access-Control-Allow-Origin", "*");
    res.header('token', token);
    res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        admin: user.admin,
        token: token
    });
});

router.post('/logout', async (req, res) => {
    try {
        const token = jwt.sign('', process.env.TOKEN_SECRET, {
            expiresIn: '1s'
        });
        res.header('token', token);
        res.status(200).send('Logged out');
    } catch(err) {
        res.status(400).json({error_message: err});
    }
});

module.exports = router;
