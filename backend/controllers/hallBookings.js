// const { validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'spaces_db'
});
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

const hallBookings = async (req, res) => {
    let bookings;
    const { hall } = req.body ;
    // const hall = 'L3';
        const sql = "SELECT JSON_OBJECT(  'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lh_or_lab ) FROM Bookings WHERE hall = ? ORDER BY date desc ";
        const values = [hall];
         
        try {
            bookings =  await query(sql, values );
            // console.log(bookings);
          } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 
    
          res.json({bookings});
        //   console.log(bookings);

 }
// hallBookings();
module.exports = hallBookings