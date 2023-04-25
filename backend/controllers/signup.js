const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id, name, email, password, dept, user_type } = req.body

  try {
    const user = await pool.query('SELECT * FROM users where userid=? OR email = ?', [id, email]);

    if (user[0].length > 0) {
      return res.status(400).json({ success: false, error: "User with same roll no or email already exists" });
    }

    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool.query('INSERT INTO users (userid, name, email, password, dept, dues, user_type) values (?, ?, ?, ?, ?, ?, ?)', [id, name, email, hashedPassword, dept, 0, user_type]);

    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET)
    res.status(200).json({ success: true, authToken: jwtToken, user: { id, name, email, dept, dues: 0, user_type } })
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

module.exports = signup