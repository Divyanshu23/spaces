const pool = require("../db")

const checkLHC = async (req, res) => {
  const { date, start, end, lhc } = req.query

  try {
    const [rows, fields] = await pool.query(`SELECT lec_hall, capacity, projector, recording_camera, booking_rate FROM lhcs WHERE lec_hall = ? AND lec_hall NOT IN (SELECT DISTINCT lec_hall FROM lhc_bookings WHERE date = ? AND start < ? AND end > ?)`, [parseInt(lhc), date, end, start]);

    res.status(200).json({ success: true, LHCs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = checkLHC