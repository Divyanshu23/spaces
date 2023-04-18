const jwt = require('jsonwebtoken')

const JWT_SECRET = "key@2319"

const validateToken = async (req, res, next) => {
    const jwtToken = req.header("auth-token")
    if (!jwtToken)
        return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
    try {
        const data = await jwt.verify(jwtToken, JWT_SECRET)
        req.user = data
    } catch (error) {
        return res.status(401).json({ success: false, error: "Please authenticate using a valid token" })
    }
    next()
}

module.exports = validateToken