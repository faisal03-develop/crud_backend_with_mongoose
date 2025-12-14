const express = require('express');
const Blog = require('../models/blog.model');
const updatedPost = express();




updatedPost.post('/updatepost', async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = updatedPost;