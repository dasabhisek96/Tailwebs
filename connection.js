const mysql = require('mysql2');
/*const sequelize = require('sequelize');*/
var connection = mysql.createConnection({
    port:3306,
    host:'localhost',
    user:'root',
    password:'1234',
    database:'tailwebs'
});
connection.connect((err)=>{
    if(!err){
        console.log('Data base is connected');
    }
    else
        console.log('Error',err );
    
})

module.exports = connection;