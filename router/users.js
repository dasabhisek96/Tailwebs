const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const connection = require('../connection');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res) => {
    const {  name, username, password, role } = req.body;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Store user in the database
    const query = 'INSERT INTO users_tailwebs ( name, username, password,role) VALUES (?,?,?,?)';
    connection.query(query, [ name, username, hashedPassword,role], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).send('Error registering user');
        
      }
      return res.send('User registered successfully');
      
    });
  });



  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Retrieve user from the database
    const query = 'SELECT * FROM users_tailwebs WHERE username = ?';
    connection.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Error logging in');
        return;
      }
      if (results.length === 0) {
        res.status(400).send('User not found');
        return;
      }
  
      const user = results[0];

      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid username or password' });
        }
  
        const token = jwt.sign({ id: user.id },'verySecretValue', {expiresIn: '1h'});
        res.json({ message: 'Login successful', token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
   
    });
    
  });
  module.exports = router;