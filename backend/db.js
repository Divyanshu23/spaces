const dotenv = require("dotenv")
const mysql = require("mysql2")

dotenv.config()

console.log(process.env.MYSQL_HOST)

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "spaces_db"
}).promise()

// pool.q

module.exports = pool