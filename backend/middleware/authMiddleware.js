const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
    let token;

    // For this EJS app, we'll read the token from a cookie
    if (req.cookies && req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).redirect('/auth/login');
        }
    }

    if (!token) {
        res.status(401).redirect('/auth/login');
    }
}

module.exports = { protect };