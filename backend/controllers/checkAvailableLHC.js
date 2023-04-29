const pool = require("../db")

const checkLHC = async (req, res) => {
  const { date, start, end, lhc } = req.query
  const { id } = req.user
  let user_type = "student";

  if (id != null)
    user_type = await pool.query(`SELECT user_type from users where userid = ?`, [id]);

  let date_time = new Date();
  let date_today = ("0" + date_time.getDate()).slice(-2);

  // get current month
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

  // get current year
  let year = date_time.getFullYear();
  let today_date = year + "-" + month + "-" + date_today;

  try {
    let [rows, fields] = await pool.query(`SELECT lec_hall, capacity, projector, recording_camera, booking_rate FROM lhcs WHERE lec_hall = ? AND lec_hall NOT IN (SELECT DISTINCT lec_hall FROM lhc_bookings WHERE date = ? AND start < ? AND end > ?)`, [parseInt(lhc), date, end + ':00:00', start + ':00:00']);

    if (rows.length == 0 && user_type[0][0].user_type == 'faculty') {
      let sql = "SELECT distinct * from (select lhcs.lec_hall, capacity, projector, recording_camera, booking_rate FROM ((lhc_bookings join users on lhc_bookings.userid = users.userid) join lhcs on lhcs.lec_hall = lhc_bookings.lec_hall) WHERE date = ?  AND date > ? AND start < ? AND end > ? AND user_type='student')a; ";
      let values = [date, today_date, end + ':00:00', start + ':00:00'];
      [rows, fields] = await pool.query(sql, values);
    }

    res.status(200).json({ success: true, LHCs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = checkLHC