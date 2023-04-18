const { validationResult } = require('express-validator')
const mysql = require("mysql2")
// const {connectToDB, connection} = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const User = require("../models/users")
const JWT_SECRET = "key@2319"

// const myfun = async () => {
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'mysql',
//         database: 'spaces_db'
//     });
//     return connection;
// }

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'spaces_db'
});

const login = async (req, res) => {
    console.log("req is here")
    // const connection = await myfun();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body
    console.log(email, password);
    const user_type = 'student';
    // const user = await User.findOne({email})
    let user;
    if (user_type == 'student') {
        // console.log(connection)
        connection.query('SELECT roll, email, password FROM student where email= ?', [email], async (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
            //   console.log(rows);
            user = rows;
            console.log(user);
            if (!user)
                return res.status(400).json({ success: false, error: "Invalid Credentials 1" })

                const salt = await bcrypt.genSalt(6)
                const hashedPassword = await bcrypt.hash(password, salt)
                
            // if (!await bcrypt.compare(password, user.password))
            //     return res.status(400).json({ success: false, error: "Invalid Credentials 2" })

            try {
                const jwtToken = await jwt.sign({ userid: user.id }, JWT_SECRET)
                res.status(200).json({ success: true, authToken: jwtToken })
                console.log('Login Succesful!');
            } catch (error) {
                res.status(500).json({ success: true, error: "Some internal error occured" })
            }

            //   console.log(user);
        });
    }

    else if (user_type == 'faculty') {
        connection.query('SELECT fid, email,password FROM faculty where email= ?', [email], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
            user = rows;
        });
    }

    else {
        connection.query('SELECT empid, email,password FROM admin where email= ?', [email], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            }
            user = rows;

        });
    }

    console.log(user);
}

module.exports = login