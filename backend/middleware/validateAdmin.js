const jwt = require('jsonwebtoken')

const pool = require("../db")

const validateToken = async (req, res, next) => {
    const jwtToken = req.header("auth-token")
    if (!jwtToken)
        return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
    try {
        const data = jwt.verify(jwtToken, process.env.JWT_SECRET)
        const id = data.id
        const admin = await pool.query('select * from admin where adminid = ?', [id])
        if(admin[0].length === 0)
            return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
    } catch (error) {
        return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
    }
    next()
}

module.exports = validateToken