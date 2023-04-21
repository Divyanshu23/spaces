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

const lh_query = async (req, res) => {

    const { date, from, to, cap } = req.body    
    let available;
    try {
        // query is incomplete
        available =  await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Capacity', capacity) FROM LH WHERE lec_hall NOT IN (SELECT lec_hall FROM BOOKINGS WHERE date = ? AND ((start>=?  AND start<? ) OR (?>=start AND end> ?) ) ) AND capacity>=? ORDER BY capacity ", [date, from, to, from ,from, cap] );
        console.log(available);
      } catch (error) {
        console.log('error in search query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 

      res.json({available});

      console.log('query is here 5');
    }

    


module.exports = lh_query