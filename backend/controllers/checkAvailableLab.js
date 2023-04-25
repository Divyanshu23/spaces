const pool = require("../db")

const checkLab = async (req, res) => {
  const { date, start, end, lhc } = req.query

  try {
    const [rows, fields] = await pool.query(`SELECT * FROM labs WHERE lab = ? AND lab NOT IN (SELECT DISTINCT lab FROM lab_bookings WHERE date = ? AND start < ? AND end > ?)`, [lhc, date, end, start]);

    res.status(200).json({ success: true, Labs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = checkLab