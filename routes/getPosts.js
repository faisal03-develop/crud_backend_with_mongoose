const express = require('express');
const Blog =require('../models/blog.model');
const postS = express.Router();


postS.get('/getposts', async (req, res) => {
    try{
        const posts = await Blog.find();
        res.json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = postS;