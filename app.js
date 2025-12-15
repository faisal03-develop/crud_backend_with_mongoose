const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const router1 = require('./routes/user');
const Blog = require('./models/blog.model');
const createPost = require('./routes/createPost');
const postS = require('./routes/getPosts');
const updatedPost = require('./routes/updatePost');
const deletePost = require('./routes/deletePost');

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


connectDB();

app.use('', require('./routes/auth'));

app.use('/', router1);



app.get('/', (req, res) => {
res.send('API is running');
});

app.use('', createPost);
app.use('', postS);
app.use('', updatedPost);
app.use('', deletePost);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

