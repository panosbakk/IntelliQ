const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Search for the user in the database
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ error: 'Incorrect username or password' });

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect username or password' });

    // Create a JSON Web Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 360000 });

    // Send the token as the response
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
