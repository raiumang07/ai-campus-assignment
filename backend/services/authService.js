const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(username, password) {
    const user = new User({ username, password });
    await user.save();
    return user;
}

async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { user, token };
}

module.exports = {
    register,
    login,
};