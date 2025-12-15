const express = require('express');
const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const postS = express.Router();


postS.get('/getpost/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findById(postId);
        console.log(post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

postS.get('/getposts', async (req, res) => {
    try{
        const posts = await Blog.find().populate('user', 'name');
        res.json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = postS;