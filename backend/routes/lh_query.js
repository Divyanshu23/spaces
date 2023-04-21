const express = require("express")
const check_availability_controller = require("../controllers/lh_query")
const myBookings_controller = require("../controllers/myBookings")
const validateToken = require("../middleware/validateToken")

const router = express.Router()
console.log('query req is successful till router');

router.get("/check_availability", [validateToken], check_availability_controller)
router.get("/myBookings", [validateToken], myBookings_controller)
 

module.exports = router
