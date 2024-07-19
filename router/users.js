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

  router.get('/:username/email',  async (req, res) => {
    const username = req.params.username
    const query = 'select id FROM users_tailwebs WHERE username = ?';
   
    connection.query(query, [username], (err, result) => {
        if (err) {
          console.error('Error :', err);
          res.send('Error executing query');
          return;
        }
       
        res.send(result);
      });
  });


  router.delete('/delete/:id',(req,res,next)=>{
    const id = req.params.id;
    const query = "delete from users_tailwebs where id =?";
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if(result.affectedRows == 0){
                return res.status(404).json({message:"User id not found"});
            }
            return res.status(200).json({message:"User Deleted Successfully"});

        }
        else{
            return res.status(500).json(err);
        }
    })
});

router.patch('/update/:id',(req,res,next)=>{
  const id = req.params.id;
  let user = req.body;
  var query = "update mark set mark = ? where user_id=?" ;
  connection.query(query,[user.mark,id],(err,result)=>{
      if(!err){
          if(result.affectedRows == 0){
              return res.status(404).json({message:"User not found"});
          }
          return res.status(200).json({message:"Update Successfully"});
      }
      else{
          return res.status(500).json(err);
      }
  });
});


  module.exports = router;