const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
}));

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  actors: { type: [String], required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },  // Added poster field
}));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error during signup' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});

// Movie details route
app.get('/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error getting movie details' });
  }
});

// Watchlist route
app.post('/watchlist', async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.watchlist.push(movieId);
    await user.save();

    res.json({ message: 'Movie added to watchlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding movie to watchlist' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
