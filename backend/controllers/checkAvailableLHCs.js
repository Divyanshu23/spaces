const pool = require("../db")

const lh_query = async (req, res) => {
  const { date, start, end, cap } = req.query

  try {
    const [rows, fields] = await pool.query(`SELECT lec_hall, capacity, projector, recording_camera, booking_rate FROM lhcs WHERE capacity >= ? AND lec_hall NOT IN (SELECT DISTINCT lec_hall FROM lhc_bookings WHERE date = ? AND start < ?AND end > ?)`, [cap, date, end, start]);

    res.status(200).json({ success: true, LHCs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = lh_query