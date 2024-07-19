const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../connection');
const router = express.Router();

router.get('/students',  async (req, res) => {
  const { Mark } = req.body;
  const query = 'SELECT users_tailwebs.name, subject.Subject, mark.Mark FROM ((mark INNER JOIN users_tailwebs ON users_tailwebs.id = mark.user_id) INNER JOIN subject ON subject.id = mark.subject_id);'
  connection.query(query, [Mark], (err, result) => {
      if (err) {
        console.error('Error :', err);
        res.send('Error executing query');
        return;
      }
      res.send(result);
    });
});



router.post('/subject', async (req, res) => {
  const { Subject } = req.body;
  const query = 'INSERT INTO subject (Subject) VALUES (?)';
  connection.query(query, [Subject], (err, result) => {
      if (err) {
        console.error('Error :', err);
        res.status(500).send('Error Subject Not Added');
        return;
      }
      res.send('Subject Added ', result);
    });
});

router.post('/marks', async (req, res) => {
    const { Mark, subject_id,user_id } = req.body;
    const query = 'INSERT INTO mark (Mark, subject_id,user_id) VALUES (?,?,?)';
    connection.query(query, [Mark, subject_id,user_id], (err, result) => {
        if (err) {
          console.error('Error :', err);
          res.status(500).send('Error Marks Not Added');
          return;
        }
        res.send('Marks Added ', result);
        res.json
      });
});
module.exports = router;

