const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")


const login = async (req, res) => {

    const userid = req.user.id
    try {
        let user = await pool.query('SELECT * FROM users where userid=?', [userid]);
        if(user[0].length == 0) {
            user = await pool.query('SELECT * FROM admin where adminid=?', [userid]);
            if(user[0].length == 0){
                return res.status(400).json({ success: false, error: "Invalid Credentials" })
            }
            user[0][0].user_type = "admin"
            delete user[0][0].password
            res.status(200).json({ success: true, user: user[0][0] })
        } else {
            delete user[0][0].password
            res.status(200).json({ success: true, user: user[0][0] })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, error: 'Internal Server Error' })
    }
}

module.exports = login