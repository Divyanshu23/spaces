const pool = require("../db")

const cancelBooking = async (req, res) => {
    const { hall, date, start, end, type } = req.body;
    const dateReversed = date.split("-").reverse().join("-");
    let bal;
    let user_id;
    if (type == 'lhc') {
        try {
            let b = await pool.query("select amount, userid from lhc_bookings where lec_hall = ? and date = ? and start = ? and end = ?", [hall, dateReversed, start, end]);

            bal = b[0][0].amount;
            user_id = b[0][0].userid;

            await pool.query("Delete FROM lhc_bookings WHERE lec_hall = ? and date = ? and start = ? and end = ?", [hall, dateReversed, start, end]);

            await pool.query("UPDATE users SET dues = dues - ? WHERE userid = ?", [bal, user_id]);
            res.status(200).json({ success: true, message: 'Booking cancelled successfully' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (type == 'lab') {
        try {
            let b = await pool.query("select amount, userid from lab_bookings where lab = ? and date = ? and start = ? and end = ?", [hall, dateReversed, start, end])

            bal = b[0][0].amount;
            user_id = b[0][0].userid;

            await pool.query("Delete FROM lab_bookings where lab = ? and date = ? and start = ? and end = ?", [hall, dateReversed, start, end]);

            await pool.query("UPDATE users SET dues = dues - ? WHERE userid = ?", [bal, user_id]);
            res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = cancelBooking