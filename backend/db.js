const mysql = require("mysql2")
let connection;
const connectToDB = async () => {
    try {
        connection = mysql.createConnection( {
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'spaces_db'
          });
          console.log("connection success")

        //   connection.connect();
    } catch (error) {
        console.error("Can't Connect to database")
        process.exit()
    }
}

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'mysql',
//     database: 'spaces_db'
// });
console.log("connection success")


module.exports = {connectToDB, connection}

 
 