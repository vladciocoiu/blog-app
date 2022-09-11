const jwt = require('jsonwebtoken');

// middleware function that protects private routes
module.exports = (req, res, next) => {

    // get token from req header
    const token = req.header('auth_token');

    if(!token) return res.status(401).json({ error: 'Access denied.' });

    // verify token
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();

    } catch (err) {
        res.status(400).json({ error: 'Invalid Token.' });
    }
};