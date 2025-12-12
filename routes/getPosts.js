const express = require('express');
const Blog =require('../models/blog.model');
const postS = express.Router();


postS.get('/getPosts', async (req, res) => {
    const posts = await Blog.find();
    res.json(posts);
});

module.exports = postS;