const pool = require("../db")

const lh_query = async (req, res) => {
  const { date, start, end, cap } = req.query

  try {
    const [rows, fields] = await pool.query(`SELECT lab, capacity, OS, booking_rate FROM labs WHERE capacity >= ? AND lab NOT IN (SELECT DISTINCT lab FROM lab_bookings WHERE date = ? AND start < ?AND end > ?)`, [cap, date, end, start]);

    res.status(200).json({ success: true, Labs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = lh_query