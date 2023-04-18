const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'spaces_db'
});
const util = require('util');
const query = util.promisify(connection.query).bind(connection);


// const User = require("../models/users")
const JWT_SECRET = "key@2319"

const signup = async (req, res) => {

    const { date, from, to, capacity } = req.body
    // hardcode for testing
        
    

    try {
        // query is incomplete
        var available =  await query("SELECT JSON_OBJECT('lecture_hall', s.roll, 'name', s.name, 'email', s.email) AS 'Registered' FROM student s, student t where s.roll = t.roll");
        console.log(available);
      } catch (error) {
        console.log('error in search query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 

      res.json({available});

      console.log('query is here 5');
    }

    


module.exports = signup