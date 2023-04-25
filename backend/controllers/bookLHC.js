const pool = require("../db")

const bookLHC = async (req, res) => {
    const { hall, date, from, to } = req.body;
    const { id } = req.user

    console.log(req.body, id);

    try {
        let sql = `SELECT COUNT(*) AS count FROM lhc_bookings WHERE lec_hall = ${hall} AND date = '${date}' AND (start <= TIME('${to}:00') AND end >= TIME('${from}:00'))`;

        const results = await pool.query(sql)
        const count = results[0][0].count;
        if (count > 0) {
            res.status(400).json({ success: false, error: "Booking already exists" })
        } else {
            sql = 'SELECT booking_rate FROM lhcs where lec_hall= ?';
            let values = [hall];

            const r = await pool.query(sql, values);
            const rate = r[0][0].booking_rate;
            const cost = (parseInt(to) - parseInt(from)) * parseInt(rate);

            sql = `INSERT INTO lhc_bookings (lec_hall, userid, date, start, end, amount) 
               VALUES (${hall}, ${id}, STR_TO_DATE('${date}', '%Y-%m-%d'), TIME(CONCAT('${from}', ':00')), TIME(CONCAT('${to}', ':00')), ${cost})`;
            await pool.query(sql);
            sql = `UPDATE users SET dues = dues + ${cost} WHERE userid = ?`;
            values = [id];
            await pool.query(sql, values);
            res.status(200).json({ success: true, msg: "Booking Successfull" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = bookLHC