const express = require('express');
const Blog = require('../models/blog.model');
const delet = express();
const protect = require('../middleware/auth');


delet.delete('/deletepost/:id',protect, async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if(post.user.toString() !== req.user._id.toString()){
            res.status(401).json('User not authorized');
          }
          else{
            await Blog.findByIdAndDelete(req.params.id);
        res.json(post,"Post Deleted Successfully");

          }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = delet;