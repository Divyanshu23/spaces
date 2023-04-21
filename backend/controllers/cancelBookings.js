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

const cancel_bookings = async (req, res) => {

    const {lec_hall, Booking_Date, start_time, end_time, category, email} = req.body;  
    // let lec_hall = 'L20';
    // let Booking_Date = '2023-04-24';
    // let start_time = '00:00:13'
    // let end_time = '00:00:14'
    // let category = 'student';
    // let email = 'videhag@iitk.ac.in';
    var bal;

        try {
            // query is incomplete
            // bal = await query("select amount from Bookings where hall = ? and date = ? and start = ? and end = ?", [lec_hall, Booking_Date, start_time, end_time])
            let b = await query("select amount from Bookings where hall = ? and date = ? and start = ? and end = ?", [lec_hall, Booking_Date, start_time, end_time])
            // var available =  await query("Delete FROM Bookings WHERE hall = ? and date = ? and start = ? and end = ?", [lec_hall, Booking_Date, start_time, end_time] );
            // var available = await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lhc_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );
            // let b = Object.values(bal);
            // let b = Object.values(bal);
            bal = b[0].amount;
            console.log(bal);
          } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 
    

    try {
        // query is incomplete
        await query("Delete FROM Bookings WHERE hall = ? and date = ? and start = ? and end = ?", [lec_hall, Booking_Date, start_time, end_time] );
        // var available = await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lhc_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );

      } catch (error) {
        console.log('error in delete query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
      if(category == 'student'){
        try {
            // query is incomplete
            await query("UPDATE student SET dues = dues - ? WHERE email = ?", [bal, email] );
            // var available = await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lhc_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );
    
          } catch (error) {
            console.log('error in update query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }

      }
      else if(category == 'faculty'){
        try {
            // query is incomplete
            await query("UPDATE faculty SET dues = dues - ? WHERE email = ?", [bal, email] );
            // var available = await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lhc_or_lab, 'Amount', amount) FROM Bookings WHERE email = ? and date > ? ORDER BY date asc ", [email, str_date] );
    
          } catch (error) {
            console.log('error in update query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }

      }

      console.log('query is here 5');
    }
    // cancel_bookings();


    


module.exports = cancel_bookings