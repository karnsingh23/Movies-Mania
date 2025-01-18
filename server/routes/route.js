const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/schema')
const Favourite = require('../model/favouriteMovies')
const checkJwtToken = require('../middleware/checkAuth')
const SECRET_KEY =process.env.SECRET_KEY;

const router = express.Router();


// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id , username: user.username}, SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});


// add to favourite
router.post('/addfavourites', checkJwtToken, async (req, res) => {
  try {
      const { id: userId } = req.user; // userId is already extracted from the JWT token
      
      const { movieId } = req.body; // Get movieId from the request body

      if (!movieId) {
          return res.status(400).json({ message: 'Movie ID is required' });
      }

      const existingFavorite = await Favourite.findOne({ userId, movieId });
      if (existingFavorite) {
          return res.status(400).json({ message: 'Movie is already in favorites' });
      }

      // Create a new favorite document
      const favorite = new Favourite({
          userId,
          movieId,
      });

      await favorite.save();

      res.status(201).json({
          message: 'Movie added to favorites',
          favorite,
      });
  } catch (err) {
      console.error('Error adding to favorites:', err.message);
      res.status(500).json({
          message: 'Failed to add to favorites',
          error: err.message,
      });
  }
});




// Fetch user's favorite movies
router.get('/getfavourites', checkJwtToken, async (req, res) => {
  try {
      const { id } = req.user; 

      
      const favourites = await Favourite.find({ userId:id });
      res.status(200).json({ favourites });
  } catch (err) {
      res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
  }
});


//delete favourite

router.delete('/delete',checkJwtToken, async(req,res)=>{

  try {
    const {id} = req.user
    const {movieId} = req.body
    
    const result = await Favourite.findOneAndDelete({ userId: id, movieId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Favorite movie not found' });
    }

    res.status(200).json({ message: 'Movie successfully deleted from favorites' });
  } catch (error) {
    console.error('Error deleting favorite movie:', error.message);
    res.status(500).json({ message: 'Failed to delete favorite movie', error: error.message });
  }
    
    

})


module.exports = router;
