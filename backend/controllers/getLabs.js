const pool = require("../db")

const lab_query = async (req, res) => {
    const { lab } = req.query;

    try {
        let sql = 'select * from lab_bookings where lab = ?';
        const results = await pool.query(sql,[lab])
        res.status(200).json({ success: true, labs: results[0]})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

module.exports = lab_query