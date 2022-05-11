const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send('No access');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch(err) {
        return res.status(400).json({error_message: err});
    }
    next();
}

module.exports = auth;