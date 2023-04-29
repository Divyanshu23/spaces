const pool = require("../db")
const { sendMail } = require('../services/emailService');

async function cancel_bookings_and_notify(hall, Booking_Date, start_time, end_time, res) {

    let bal;
    let user_id ;
    let user_email =  null ;
        try {
           let b = await pool.query("select amount, userid from lab_bookings where lab = ? and date = ? and start = ? and end = ?", [hall, Booking_Date, start_time, end_time]);
            bal = b[0][0].amount;   // to be verified
            user_id = b[0][0].userid;
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
          try {
              
            await pool.query("Delete FROM lab_bookings WHERE lab = ? and date = ? and start =  ? and end =  ?", [hall, Booking_Date, start_time, end_time] );
 
            } catch (error) {
              console.error(error); 
              res.status(500).json({ error: 'Internal server error' });
            }

          user_email = await pool.query("select email from users where userid = ?", [user_id]);
         

    

        // update dues
         try {
            
            await pool.query("UPDATE users SET dues = dues - ? WHERE userid = ?", [bal, user_id] );
     
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
     
        //   notify

        try {
            const email = user_email[0][0].email;
            await sendMail({
            to: email,
            OTP: 78787878,
            h: hall,
            d:Booking_Date, 
            s:start_time, 
            e: end_time,
            type: 'Lab'

            });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: "Unable to send mail for notifying" });
        }

    }


const bookLab = async (req, res) => {
    const { hall, date, from, to } = req.body;
    const { id } = req.user


    let date_time = new Date();
    let date_today = ("0" + date_time.getDate()).slice(-2);

    // get current month
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

    // get current year
    let year = date_time.getFullYear();
    let today_date = year + "-" + month + "-" + date_today; 



    try {
        let sql = `SELECT COUNT(*) AS count FROM lab_bookings WHERE lab = ${hall} AND date = '${date}' AND (start < TIME('${to}:00') AND end > TIME('${from}:00'))`;
        
        const results = await pool.query(sql)

        const count = results[0][0].count;
        let user_type = await pool.query('SELECT user_type from users where userid = ?', [id]);

        if (count > 0 && user_type[0][0].user_type == 'student') {  
            res.status(400).json({ success: false, error: "Booking already exists" })
        }

        else if (count > 0 && user_type[0][0].user_type == 'faculty') { // overwrite
            
            sql = "SELECT lab, date, start, end FROM lab_bookings INNER JOIN users ON users.userid = lab_bookings.userid  WHERE lab = ? AND date = ? AND date > ? AND start < ? AND end > ? AND user_type='student' ";
            let values =  [hall, date, today_date, to+':00:00', from+':00:00'];
            const clashing_bookings = await pool.query(sql, values);
            // run a loop over all the clashing bookings by calling the function cancelBookings();
            for (let i = 0; i < clashing_bookings[0].length; i++) {
                cancel_bookings_and_notify(clashing_bookings[0][i].lab, clashing_bookings[0][i].date, clashing_bookings[0][i].start, clashing_bookings[0][i].end,  res);
              }


            sql = 'SELECT booking_rate FROM labs where lab= ?';
            values = [hall];

            const r = await pool.query(sql, values);
            const rate = r[0][0].booking_rate;
            const cost = (parseInt(to) - parseInt(from)) * parseInt(rate);

            sql = `INSERT INTO lab_bookings (lab, userid, date, start, end, amount) 
               VALUES (${hall}, ${id}, STR_TO_DATE('${date}', '%Y-%m-%d'), TIME(CONCAT('${from}', ':00:00')), TIME(CONCAT('${to}', ':00:00')), ${cost})`;
            await pool.query(sql);
            sql = `UPDATE users SET dues = dues + ${cost} WHERE userid = ?`;
            values = [id];
            await pool.query(sql, values);
            res.status(200).json({ success: true, msg: "Booking Successfull" })
        }

         else {
            sql = 'SELECT booking_rate FROM labs where lab= ?';
            let values = [hall];

            const r = await pool.query(sql, values);
            const rate = r[0][0].booking_rate;
            const cost = (parseInt(to) - parseInt(from)) * parseInt(rate);

            sql = `INSERT INTO lab_bookings (lab, userid, date, start, end, amount) 
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

module.exports = bookLab