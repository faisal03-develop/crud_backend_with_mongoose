const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const protect = require('../middleware/auth');

const createToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '1h',
});
};


router.post('/register', async (req, res) => {
const { name, email, password } = req.body;


try {
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already registered' });


const user = await User.create({ name, email, password });


const token = createToken(user._id);


res.status(201).json({
token,
user: { id: user._id, name: user.name, email: user.email },
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});

router.post('/login', async (req, res) => {
const { email, password } = req.body;


try {
const user = await User.findOne({ email }).select('+password');
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await user.matchPassword(password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = createToken(user._id);


res.json({
token,
user: { id: user._id, name: user.name, email: user.email },
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});
module.exports = router;