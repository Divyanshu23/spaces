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


const book = async (req, res) => {
    let rate;
    console.log('req is successful 2');

    const { hall, hall_type, date, from, to, email, user_type } = req.body;

    // // hard code for testing purpose
    // const hall = 'L1';
    // const hall_type = 'lh';
    // const date = '2022-04-25';
    // const from = '9:00:00';
    // const to = '12:00:00';
    // const email = 'aror@iitk.ac.in';
    // const  user_type = 'faculty';

    if (hall_type == 'lh') {
        var sql = 'SELECT rate FROM LHC where lec_hall= ?';
        const values = [hall];
        try {
            let r = await query(sql, values);
            rate = r[0].rate;
            //console.log(rate);
        } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else {
        var sql = 'SELECT rate FROM labs where lab= ?';
        const values = [hall];

        try {
            rate = await query(sql, values);
            console.log(rate);
        } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }


    const to_hr = parseInt(to.substring(0, 2));  // to get the end hour
    const from_hr = parseInt(from.substring(0, 2)); // to get the start hour

    const n_slots = to_hr - from_hr;

    var cost = n_slots * rate;

    try {

        const user = await query('INSERT INTO bookings (hall, date, start, end, amount, email, user_type, lh_or_lab  ) values (?, ?, ?, ?, ?, ?, ?, ?)',
            [hall, date, from, to, cost, email, user_type, hall_type]);
        console.log(user);
    } catch (error) {
        console.log('error in insert query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

    var sql = `UPDATE Student SET dues = dues + ${cost} WHERE email = ?`;
    const values = [email];
    if (user_type == 'faculty') {
        sql = `UPDATE Faculty SET dues = dues + ${cost} WHERE email = ?`;
    }

    try {
        const abc = await query(sql, values);
        console.log(abc);
    } catch (error) {
        console.log('error in update query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json({ message: 'Booking Successful' });

}
// book();
module.exports = book