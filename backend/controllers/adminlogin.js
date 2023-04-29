const pool = require("../db")

const adminlogin = async (req, res) => {
    const adminid = req.user.id
    try {
        let user = await pool.query('SELECT * FROM admin where adminid=?', [adminid]);
        if(user[0].length == 0) {
            return res.status(400).json({ success: false, error: "Invalid Credentials" })
        } else {
            user[0][0].user_type = "admin"
            delete user[0][0].password
            res.status(200).json({ success: true, user: user[0][0] })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, error: 'Internal Server Error' })
    }
}

module.exports = adminlogin