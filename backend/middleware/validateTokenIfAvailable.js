const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    const jwtToken = req.header("auth-token")
    if (jwtToken == "null") {
        req.user = {id:null}
    } else {
        try {
            const data = jwt.verify(jwtToken, process.env.JWT_SECRET)
            req.user = data
        } catch (error) {
            return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
        }
    }
    next()
}

module.exports = validateToken