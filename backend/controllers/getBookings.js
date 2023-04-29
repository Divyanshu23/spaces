const pool = require("../db")

const user_query = async (req, res) => {
    const {userid} = req.query

    try {
        const lhcBookings = await pool.query("SELECT lec_hall, userid , date, start, end, amount FROM lhc_bookings WHERE userid = ? ORDER BY date desc ", [userid]);
        const labBbookings = await pool.query("SELECT lab, userid, date, start, end, amount FROM lab_bookings WHERE userid = ? ORDER BY date desc ", [userid]);
        const dues = await pool.query("SELECT dues from users where userid = ?", [userid]);
        res.json({ success: true, lhcBookings: lhcBookings[0], labBookings: labBbookings[0], dues: dues[0][0]});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = user_query