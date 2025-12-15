const express = require('express');
const Blog = require('../models/blog.model');
const delet = express();


delet.delete('/deletepost/:id', async (req, res) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        // res.confirm('Do you want to delete the post?')
        res.json(post,"Post Deleted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = delet;