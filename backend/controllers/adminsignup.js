const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")

const adminsignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id, name, email, password} = req.body

  try {
    const user = await pool.query('SELECT * FROM admin where adminid=? OR email = ?', [id, email]);

    if (user[0].length > 0) {
      return res.status(400).json({ success: false, error: "Admin with same adminid no or email already exists" });
    }

    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool.query('INSERT INTO admin (adminid, name, email, password) values (?, ?, ?, ?)', [id, name, email, hashedPassword]);

    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET)
    res.status(200).json({ success: true, authToken: jwtToken, user: { id, name, email, user_type:"admin" } })
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

module.exports = adminsignup