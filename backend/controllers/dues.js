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
 
const dues = async (req, res) => {
        const { id, user_type } = req.body ;
        // const id = 1909600;
        // const user_type = 'student';
        const sql = "SELECT JSON_OBJECT('Amount Due', dues) from student WHERE roll = ?";
        const values = [id];
        if(user_type == 'faculty'){
            sql =  "SELECT JSON_OBJECT('Amount Due', dues) from faculty WHERE fid = ?";
        }

        try {
            var dues =  await query(sql, values );
            console.log(dues);
          } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 
    
          res.json({dues});

 }
// dues();
module.exports = dues