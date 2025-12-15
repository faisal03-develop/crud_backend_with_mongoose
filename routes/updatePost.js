const express = require('express');
const Blog = require('../models/blog.model');
const updatedPost = express();
const protect = require('../middleware/auth');

 updatedPost.put('/updatepost/:id',protect, async (req, res) => {

    const blog = await Blog.findById(req.params.id);
    
    if(blog.user.toString() !== req.user._id.toString()){
      res.status(401);
      throw new Error('User not authorized');
    }

  try {
    const postId = req.params.id;
    const { title, description } = req.body;
    const findBlog = await Blog.findById(postId);

    // console.log(findBlog);
    
   const updatedPost = await Blog.findByIdAndUpdate(postId, { title, description }, { new: true });
    res.json(updatedPost);
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = updatedPost;