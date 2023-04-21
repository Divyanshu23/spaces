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

const user_future_bookings = async (req, res) => {

    const { email } = req.body;    
    // let email = "videhag@iitk.ac.in"
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();
    str_date = year + "-" + month + "-" + date;
    let available;

    try {
        // query is incomplete
        available =  await query("SELECT JSON_OBJECT('Lecture Hall', hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lh_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );
        // var available = await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lhc_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );

        console.log(available);
      } catch (error) {
        console.log('error in search query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 

      res.json({available});

      console.log('query is here 5');
    }
    // user_future_bookings();


    


module.exports = user_future_bookings