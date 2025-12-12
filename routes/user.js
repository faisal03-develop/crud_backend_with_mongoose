const express = require('express');
const router1 = express.Router();
const User = require('../models/user.model');

router1.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
})

module.exports = router1;