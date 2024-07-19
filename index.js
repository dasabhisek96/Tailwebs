const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const connection = require("./connection");
const Router = require('./router/users');
const Studentmark = require('./router/mark');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5501' }));
app.use('/users',Router);
app.use('/mark',Studentmark);
module.exports = app;