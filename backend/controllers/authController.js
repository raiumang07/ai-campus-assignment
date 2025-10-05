const authService = require('../services/authService');

function getLoginPage(req, res) {
    res.render('login', { error: null });
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const { token } = await authService.login(username, password);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000, // 1 hour
        });

        res.redirect('/students');
    } catch (error) {
        res.status(401).render('login', { error: error.message });
    }
}

// You might want a registration page/form as well
async function register(req, res) {
    const { username, password } = req.body;
    try {
        const user = await authService.register(username, password);
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getLoginPage,
    login,
    register,
};