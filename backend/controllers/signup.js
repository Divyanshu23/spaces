const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateOTP } = require('../services/otp');
const { sendMail } = require('../services/emailService');

const pool = require("../db")

module.exports.signUpUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  
  const { id, name, email, password, dept, user_type } = req.body
  
  if (user_type == 'student') {
    try {
      const user = await pool.query('SELECT * FROM student where roll=? OR email = ?', [id, email]);

      if (user[0].length > 0) {
        return res.status(400).json({ success: false, error: "User with same roll no or email already exists" });
      }
      const otpGenerated = generateOTP();

      const salt = await bcrypt.genSalt(6)
      const hashedPassword = await bcrypt.hash(password, salt)

      await pool.query('INSERT INTO student (roll, name, email, password, dept, dues, otp) values (?, ?, ?, ?, ?, ?, ?)', [id, name, email, hashedPassword, dept, 0, otpGenerated]);

      try {
          await sendMail({
            to: email,
            OTP: otpGenerated,
          });
      }
      catch (error) {
          return res.status(500).json({ success: false, error: "Unable to send mail for otp" });
      }   
      
      return res.status(200).json({ success: true, message:"Please verify the email using otp", user: { id, name, email, hashedPassword, dept, dues: 0 } })
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  } else {
    try {
      const user = await pool.query('SELECT * FROM faculty where fid= ? OR email= ?', [id, email]);
      if (user[0].length > 0) {
        return res.status(400).json({ success: false, error: "User with same Fid or email already exists" });
      }
      const otpGenerated = generateOTP();

      const salt = await bcrypt.genSalt(6)
      const hashedPassword = await bcrypt.hash(password, salt)

      try {
          await sendMail({
            to: email,
            OTP: otpGenerated,
          });
      }
      catch (error) {
          return res.status(500).json({ success: false, error: "Unable to send mail for otp" });
      }   
      
      return res.status(200).json({ success: true, message:"Please verify the email using otp", user: { id, name, email, hashedPassword, dept, dues: 0 } })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

module.exports.verifyEmail = async (req, res) => {
  const { email, otp, user_type } = req.body;
  // console.log("here");
  try {
      var user;
      if (user_type == 'student') {
          // console.log("here1");
          user = await pool.query('SELECT * FROM student WHERE email = ? ',[email]);
      }
      else {
          // console.log("here2");
          user = await pool.query('SELECT * FROM faculty WHERE email = ? ',[email]);
      }
      // console.log(user);
      if (user[0].length == 0) {
            // console.log(user);
            return res.status(500).json({ success: false, error: "No such email ID exists" });
      }
      if (!user) {
        return [false, "User not found"];
      }
      if (user[0][0].otp !== otp) {
            return res.status(500).json({ success: false, error: "Incorrect otp given" });
      }
      if (user_type == 'student') {
        await pool.query("UPDATE student SET active = ? WHERE email = ?", [true, email] );
      }
      else {
        await pool.query("UPDATE faculty SET active = ? WHERE email = ?", [true, email] );
      }

      const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET)
      res.status(200).json({ success: true, authToken: jwtToken, user: user[0] })
  }
  catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
};