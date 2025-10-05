const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { protect } = require('./middleware/authMiddleware');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
app.use('/auth', authRoutes);
app.use('/students', protect, studentRoutes);

// Home
app.get('/', (req, res) => {
	return res.redirect('/students');
});

// MongoDB Connection and server start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

async function start() {
	if (!MONGODB_URI) {
		console.error('Missing MONGODB_URI in environment');
		process.exit(1);
	}

	try {
		await mongoose.connect(MONGODB_URI, {
			serverSelectionTimeoutMS: 10000,
		});
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
	} catch (err) {
		console.error('Failed to connect to MongoDB', err);
		process.exit(1);
	}
}

start();

module.exports = app;


