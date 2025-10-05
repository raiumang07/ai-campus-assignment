const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);

// POST /auth/register - To create a new user (for testing)
router.post('/register', authController.register);

module.exports = router;