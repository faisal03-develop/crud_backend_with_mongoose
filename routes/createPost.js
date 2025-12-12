const express = require('express');
const createPost = express.Router();
const Blog = require('../models/blog.model');



createPost.post('/createPost', async (req, res)=>{
    const {title, description} = req.body
    const post = await Blog.create({title, description})
    res.json(post,"Post Created Successfully")
})

module.exports = createPost;
