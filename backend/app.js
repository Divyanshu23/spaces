// const express = require("express");
// const cors = require("cors");
// const router = require("./routes");
// const AppError = require("./utils/appError");
// const errorHandler = require("./utils/errorHandler");

// const app = express();
// app.use(api, router);

// app.all("*", (req, res, next) => {
//  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
// });
// app.use(errorHandler);

// const PORT = 3001;
// app.listen(PORT, () => {
//  console.log(`server running on port ${PORT}`);
// });

// module.exports = app;



// const express = require("express");
// const app = express();
// const mysql = require('mysql2');

// app.use(cors());
// app.use(express.json())
 
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql',
//     database: 'dummy_db'
// });
 
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });
 
// app.post("/api/login", (req, res) => {
//     // const user = req.body
//     console.log(user)
//     connection.query('SELECT * from first_table', (err, rows) => {
//         if (err) throw err;
//         console.log('The data from users table are: \n', rows);
//         res.json({requestBody: req.body});
//         connection.end();
//     });
// });

// app.post("/api/available", (req,res) => {

// })
 
// app.listen(3001, () => {
//     console.log('Server is running at port 3001');
// });


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'spaces_db'
});

app.get('/api/login', (req, res) => {
  // const { email, password, user_type } = req.body;
  // res.json("hyyyy");
  const email = "prateekj@iitk.ac.in";
  const password = "123456"
  const user_type = "student";

  if(user_type=='student') {
    console.log("hy1");
    connection.query(
        'SELECT * FROM student WHERE email = ? AND password = ?',
        [email, password],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length > 0) {
            res.status(200).json({ message: 'User found' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
      );
      console.log("hy2");
  }

  else if(user_type=='faculty') {
    connection.query(
        'SELECT * FROM faculty WHERE email = ? AND password = ? ',
        [email, password],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length > 0) {
            res.status(200).json({ message: 'User found' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
      );
  }

  else {
    connection.query(
        'SELECT * FROM admin WHERE email = ? AND password = ?',
        [email, password],
        (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          } else if (results.length > 0) {
            res.status(200).json({ message: 'User found' });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
      );
  }

} );

// util module for handle callback in mysql query
// const util = require('util');

// // create variable to get result from querying
// let resultQuery = util.promisify(connection.query).bind(connection);

app.get('/test',  async (req, res) => {
    // res.json("Hey!");
    // try {
    // use resultQuery instead as await
    var registered =  await resultQuery("SELECT JSON_OBJECT('roll', s.roll, 'name', s.name, 'email', s.email) AS 'Registered' FROM student s, student t where s.roll = t.roll");
    // var claimed = await resultQuery("SELECT JSON_OBJECT('name', item_name, 'item_id', item_id, 'location', location_desc, 'color', color, 'description', description, 'image', image_url)  AS 'Claimed' FROM Items_found WHERE type = 1");
    //sending a response
    // the query string is select JSON_OBJECT, is that return json string as result? if yes, so :
    // registered = JSON.parse(registered);
    // claimed = JSON.parse(claimed);
    res.json({registered});
    // } catch (err) {
        // res.json({ message: 'error message'});
    // }
});


app.listen(3001, () => {
  console.log('Server started on port 3001');
});




