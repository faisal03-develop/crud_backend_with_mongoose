const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const router1 = require('./routes/user');
const Blog = require('./models/blog.model');
const createPost = require('./routes/createPost');
const postS = require('./routes/getPosts');

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/auth', require('./routes/auth'));

app.use('/api', router1);

app.post('/updatePost', async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => {
res.send('API is running');
});

app.use('', createPost);
app.use('', postS)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

