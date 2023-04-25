const express = require("express")
const checkAvailableLHCs = require("../controllers/checkAvailableLHCs")
const checkAvailableLHC = require("../controllers/checkAvailableLHC")
const checkAvailableLabs = require("../controllers/checkAvailableLabs")
const validateToken = require("../middleware/validateToken")
const myBookings = require("../controllers/myBookings")
const bookLHC = require("../controllers/bookLHC")
const bookLab = require("../controllers/bookLab")
const cancelBooking = require("../controllers/cancelBooking")

const router = express.Router()

router.get("/checkLHCs", [validateToken], checkAvailableLHCs)
router.get("/checkLHC", [validateToken], checkAvailableLHC)
router.get("/checkLabs", [validateToken], checkAvailableLabs)
router.get("/mybookings", [validateToken], myBookings)
router.post("/booklhc", [validateToken], bookLHC)
router.post("/booklab", [validateToken], bookLab)
router.post("/cancel", [validateToken], cancelBooking)
 

module.exports = router
