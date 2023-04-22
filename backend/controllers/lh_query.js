// const { validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'spaces_db'
});


const util = require('util');
const query = util.promisify(connection.query).bind(connection);
 
const lh_query = async (req, res) => {
   
    const { date, from, to, cap } = req.body    
    // //hardcoding for testing
    // const date = '2023-04-21';
    // const from = '15:00:00';
    // const to = '16:00:00';
    // const cap = 500;

    try {
      
        var available =  await query("SELECT JSON_OBJECT('Lecture Hall', lec_hall, 'Capacity', capacity, 'Projector' , projector, 'Recording Camera', recording_camera, 'Rate', rate) FROM LHC WHERE lec_hall NOT IN (SELECT hall FROM BOOKINGS WHERE date = ? AND ((start>=?  AND start<? ) OR (?>=start AND end> ?) ) ) AND capacity>=? ORDER BY capacity ", [date, from, to, from ,from, cap] );
        console.log(available);
      } catch (error) {
        console.log('error in search query');
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      } 

      res.json({available});

      
    }

// lh_query();
module.exports = lh_query