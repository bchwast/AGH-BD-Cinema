const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send('No access');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        res.header("Access-Control-Allow-Origin", "*");
    } catch(err) {
        return res.status(418).json({error_message: err});
    }
    next();
}

module.exports = auth;
