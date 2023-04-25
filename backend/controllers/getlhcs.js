const pool = require("../db")

const lhc_query = async (req, res) => {
    // const { hall } = req.body;
    const {hall} = req.query

    try {
        let sql = `select * from lhc_bookings where lec_hall = ${hall}`;
        const results = await pool.query(sql)
        console.log(results[0],hall)
        res.status(200).json({ success: true, lhcs: results[0]})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = lhc_query