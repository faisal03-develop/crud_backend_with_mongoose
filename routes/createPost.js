const express = require('express');
const createPost = express.Router();
const Blog = require('../models/blog.model');
const protect = require('../middleware/auth');




createPost.post('/createPost',protect , async (req, res)=>{
    try{
        const {title, description} = req.body
    const post = await Blog.create({title, description,user: req.user._id})
    res.json(post,"Post Created Successfully")
    }
    catch(err){
        console.log(err)
        res.status(500).send('Cant Create the POst Server Error')
    }
})

module.exports = createPost;
