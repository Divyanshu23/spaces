const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")


const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password, user_type } = req.body

    if (user_type != 'admin') {
        try {
            const user = await pool.query('SELECT * FROM users where email=?', [email]);

            if (user[0].length == 0) {
                return res.status(400).json({ success: false, error: "Invalid Credentials" })
            }
            if (!await bcrypt.compare(password, user[0][0].password))
                return res.status(400).json({ success: false, error: "Invalid Credentials" })

            delete user[0][0].password

            const jwtToken = jwt.sign({ id: user[0][0].userid }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, authToken: jwtToken, user: user[0][0] })
        } catch (error) {
            res.status(500).json({ success: true, error: 'Internal Server Error' })
        }
    } else {
        try {
            const user = await pool.query('SELECT * FROM admin where email= ?', [email]);

            if (user[0].length == 0) {
                return res.status(400).json({ success: false, error: "Invalid Credentials" })
            }

            if (!await bcrypt.compare(password, user[0][0].password))
                return res.status(400).json({ success: false, error: "Invalid Credentials" })

            delete user[0][0].password
            user[0][0].user_type = "admin"

            const jwtToken = jwt.sign({ id: user[0][0].adminid }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, authToken: jwtToken, user: user[0][0] })
        } catch (error) {
            res.status(500).json({ success: true, error: "Internal Server Error" })
        }
    }
}

module.exports = login