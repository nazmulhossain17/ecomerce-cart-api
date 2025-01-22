const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/dbConfig');
require('dotenv').config();
// User Registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const [userId] = await db('users').insert({ name, email, password: hashedPassword });
        res.status(201).json({ userId, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if the user exists in the database
      const user = await db('users').where({ email }).first();
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      // Compare the provided password with the hashed password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      // Generate JWT token with a 30-minute expiration
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });

      // Set the token in an HTTP-only cookie
      res.cookie('token', token, {
          httpOnly: true,  // Prevents client-side access
          secure: process.env.NODE_ENV === 'production',  // Only send over HTTPS in production
          sameSite: 'strict',  // Prevents CSRF
          maxAge: 30 * 60 * 1000,  // 30 minutes in milliseconds
      });

      // Send response with user data
      res.json({
          message: 'Login successful',
          user: {
              name: user.name,  // Assuming the `users` table has a `name` column
              email: user.email,
          },
      });
  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const logoutUser = (req, res) => {
    try {
        // Clear the token from the cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Update User Profile
const updateUserProfile = async (req, res) => {
    const { userId, name, email, password } = req.body;

    try {
        const updates = { name, email };
        if (password) updates.password = await bcrypt.hash(password, 10);

        await db('users').where({ id: userId }).update(updates);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser, logoutUser, updateUserProfile };
