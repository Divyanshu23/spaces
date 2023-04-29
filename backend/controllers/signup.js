const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")
const { generateOTP } = require("../services/OtpService")
const { sendOTPMail } = require("../services/emailService")

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id, name, email, password, dept, user_type } = req.body

  try {
    const user = await pool.query('SELECT * FROM users where userid=? OR email = ?', [id, email]);

    if (user[0].length > 0) {
      return res.status(400).json({ success: false, error: "User with same id or email already exists" });
    }

    const otpGenerated = generateOTP();
    try {
      await sendOTPMail({
        to: email,
        OTP: otpGenerated,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Unable to send mail for OTP" });
    }

    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool.query('INSERT INTO otp (userid, name, email, password, dept, user_type, otp) values (?, ?, ?, ?, ?, ?, ?)', [id, name, email, hashedPassword, dept, user_type, otpGenerated]);
    res.status(200).json({ success: true, message: `OTP Email sent to ${email}`, id })

  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

const verifyOTP = async (req, res) => {
  const { id, otp } = req.body
  const [rows, fields] = await pool.query('SELECT * FROM otp where userid=? AND otp=?', [id,otp]);

  if (rows.length === 0 || rows[0].otp != otp) {
    return res.status(400).json({ success: false, error: "Invalid OTP" });
  } else {
    const name = rows[0].name
    const email= rows[0].email
    const password = rows[0].password;
    const dept = rows[0].dept;
    const user_type = rows[0].user_type;
    await pool.query('DELETE FROM otp where userid=?', [id]);
    await pool.query('INSERT INTO users (userid, name, email, password, dept, dues, user_type) values (?, ?, ?, ?, ?, ?, ?)', [id, name, email, password, dept, 0, user_type]);

    const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET)
    res.status(200).json({ success: true, authToken: jwtToken, user: { userid:id, name, email, dept, dues: 0, user_type } })
  }
}

module.exports = {signup, verifyOTP}