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

const signup = async (req, res) => {
    let user;
    console.log('req is successful 2');
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log('error is here!');
    //     return res.status(400).json({ success: false, errors: errors.array() });
    // }

    // const { roll, name, email, password, dept, user_type } = req.body

    // hard code for testing purpose
    const roll = 190789;
    const name = 'Joe';
    const email = 'abc@iitk.ac.in';
    const password = '898989';
    const dept = 'HH';
    const user_type = 'faculty';
    
    // if (await User.findOne({ email }))
    //     return res.status(400).json({ success: false, error: "User with same email already exixts" })
        
    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(password, salt)

    if(user_type=='student') {
        console.log('query is here 1');

        try {
            user = await query('SELECT * FROM student where roll= ?', [roll]);
            console.log(user);
          } catch (error) {
            console.log('error in searc query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 

           if (user.length > 0) {
                    console.log('User with same roll already exists');
                    return res.status(400).json({ success: false, error: "User with same roll already exists" });
                  }  

          console.log('query is here 2');

          try {
            user = await query('INSERT INTO student (roll, name, email, password, dept) values (?, ?, ?, ?, ?)',
            [roll, name, email, password, dept],);
            console.log(user);
          } catch (error) {
            console.log('error in insert query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 

          res.status(200).json({ message: 'Student successfully signed up' });

 
        console.log('query is here 3');
             
        try {
            const jwtToken = await jwt.sign({ userid: user.id }, JWT_SECRET)
            res.status(200).json({ success: true, authToken: jwtToken })
        } catch (error) {
            res.status(500).json({ success: true, error: "Some internal error occured" })
        }
    
        await console.log('query is here 4');


    }
    else {
        try {
            user = await query('SELECT * FROM faculty where fid= ?', [roll]);
            console.log(user);
          } catch (error) {
            console.log('error in search query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 

           if (user.length > 0) {
                    console.log('User with same roll already exists');
                    return res.status(400).json({ success: false, error: "User with same roll already exists" });
                  }  

          console.log('query is here 2');

          try {
            user = await query( 'INSERT INTO faculty (fid, name, email, password, dept) values (?, ?, ?, ?, ?)',
            [roll, name, email, password, dept]);
            console.log(user);
          } catch (error) {
            console.log('error in insert query');
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } 

          res.status(200).json({ message: 'Student successfully signed up' });

   
    }

    console.log('query is here 5');
}

module.exports = signup