const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,  // Store hashed password
    });

    // Save user to the database
    await user.save();

    // Create JWT payload
    const payload = { user: { id: user.id } };

    // Generate JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
      }

      // Set JWT as an HttpOnly cookie
      res.cookie('token', token, { 
        httpOnly: true, // Prevent access to cookie via JS
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (HTTPS)
        maxAge: 3600000, // Cookie expiration in 1 hour
      });

      res.json({ msg: 'Registration successful' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      // Log the hashed password from the DB and the password being checked
      console.log("Stored Hash:", user.password);
      console.log("Password Attempt:", password);
  
      // Check if the provided password matches the stored hashed password
      const isMatch = await user.matchPassword(password);
      console.log("Password Match Result:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      // If match, generate JWT token and send response
      const token = generateToken(user._id);
      res.json({ token });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  });

console.log('Auth routes loaded');  // Logs to ensure the file is loaded correctly

module.exports = router;
