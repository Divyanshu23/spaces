const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require("../db")

const myBookings = async (req, res) => {

  const userid = req.user.id

  try {
    const lhcBookings = await pool.query("SELECT lec_hall, userid , date, start, end, amount FROM lhc_bookings WHERE userid = ? ORDER BY date desc ", [userid]);
    const labBbookings = await pool.query("SELECT lab, userid, date, start, end, amount FROM lab_bookings WHERE userid = ? ORDER BY date desc ", [userid]);
    res.json({ success: true, lhcBookings: lhcBookings[0], labBbookings: labBbookings[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}


module.exports = myBookings