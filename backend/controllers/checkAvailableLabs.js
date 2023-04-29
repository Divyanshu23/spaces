const pool = require("../db")

const lh_query = async (req, res) => {
  const { date, start, end, cap } = req.query

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
    let [rows, fields] = await pool.query(`SELECT lab, capacity, OS, booking_rate FROM labs WHERE capacity >= ? AND lab NOT IN (SELECT DISTINCT lab FROM lab_bookings WHERE date = ? AND start < ? AND end > ?)`, [cap, date, end + ':00:00', start + ':00:00']);

    if (rows.length == 0 && user_type[0][0].user_type == 'faculty') {
      let sql = "SELECT distinct * from (select labs.lab, capacity, OS, booking_rate FROM ((lab_bookings join users on lab_bookings.userid = users.userid) join labs on labs.lab = lab_bookings.lab) WHERE date = ?  AND date > ? AND start < ? AND end > ? AND user_type='student')a; ";
      let values = [date, today_date, end + ':00:00', start + ':00:00'];
      [rows, fields] = await pool.query(sql, values);
    }

    res.status(200).json({ success: true, Labs: rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
module.exports = lh_query