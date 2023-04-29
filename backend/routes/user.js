const express = require("express")

const validateToken = require("../middleware/validateToken")
const myBookings = require("../controllers/myBookings")
const bookLHC = require("../controllers/bookLHC")
const bookLab = require("../controllers/bookLab")
const cancelBooking = require("../controllers/cancelBooking")

const router = express.Router()

router.get("/mybookings", [validateToken], myBookings)
router.post("/booklhc", [validateToken], bookLHC)
router.post("/booklab", [validateToken], bookLab)
router.post("/cancel", [validateToken], cancelBooking)
 

module.exports = router
