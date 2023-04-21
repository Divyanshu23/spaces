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
// const JWT_SECRET = "key@2319"

const user_bookings = async (req, res) => {

    const { email } = req.body;    
    
    try {
        // query is incomplete
        var available =  await query("SELECT JSON_OBJECT('Lecture Hall', hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lh_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? ORDER BY date desc ", [email] );
        console.log(available);
      } catch (error) {
        console.log('error in search query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 

      res.json({available});

      console.log('query is here 5');
    }



    


module.exports = user_bookings