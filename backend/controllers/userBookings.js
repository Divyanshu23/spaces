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

const userBookings = async (req, res) => {
    let bookings;
    const { id, user_type } = req.body ;
    // const id = 456;
    // const user_type = 'faculty';
        var sql = "SELECT JSON_OBJECT('Lecture Hall', hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lh_or_lab, 'Amount', amount) FROM Bookings INNER JOIN student ON Bookings.email = student.email WHERE roll = ? ORDER BY date desc ";
        const values = [id];

        if(user_type == 'faculty'){
            sql = "SELECT JSON_OBJECT('Lecture Hall', hall, 'Date', date, 'Start Time', start, 'End Time', end, 'Type of room', lh_or_lab, 'Amount', amount) FROM Bookings INNER JOIN faculty ON Bookings.email = faculty.email WHERE faculty.fid = ? ORDER BY date desc ";
        }

 
        try {
            bookings =  await query(sql, values );
            console.log(bookings);
          } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 
    
          res.json({bookings});
        // console.log(bookings);

 }
// userBookings();
module.exports = userBookings