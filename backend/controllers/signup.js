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
  
  if (user_type == 'student') {
    try {
      const user = await pool.query('SELECT * FROM students where roll=? OR email = ?', [id, email]);

      if (user[0].length > 0) {
        return res.status(400).json({ success: false, error: "User with same roll no or email already exists" });
      }

      const salt = await bcrypt.genSalt(6)
      const hashedPassword = await bcrypt.hash(password, salt)

      await pool.query('INSERT INTO students (roll, name, email, password, dept, dues) values (?, ?, ?, ?, ?, ?)', [id, name, email, hashedPassword, dept, 0]);

      const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET)
      res.status(200).json({ success: true, authToken: jwtToken, user: { id, name, email, hashedPassword, dept, dues: 0 } })
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  } else {
    try {
      const user = await pool.query('SELECT * FROM faculties where fid= ? OR email= ?', [id, email]);
      if (user[0].length > 0) {
        return res.status(400).json({ success: false, error: "User with same Fid or email already exists" });
      }

      const salt = await bcrypt.genSalt(6)
      const hashedPassword = await bcrypt.hash(password, salt)

      await pool.query('INSERT INTO faculties (fid, name, email, password, dept, dues) values (?, ?, ?, ?, ?, ?)',
        [id, name, email, hashedPassword, dept, 0]);
      const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET)
      res.status(200).json({ success: true, authToken: jwtToken, user: { id, name, email, hashedPassword, dept, dues: 0 } })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

module.exports = signup