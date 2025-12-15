const express = require('express');
const router1 = express.Router();
const User = require('../models/user.model');
const protect = require('../middleware/auth');


router1.get('/me', protect, async (req, res) => {
  res.status(200).json(req.user);
});


router1.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

module.exports = router1;