const express = require("express")
// const getUserBookings = require("../")
const getLHCs = require("../controllers/getlhcs")
const getLabs = require("../controllers/getLabs")
const getUserBookings = require("../controllers/getBookings")

const router = express.Router()

router.get("/userbookings", getUserBookings)
router.get("/lhcbookings", getLHCs)
router.get("/labbookings", getLabs)
 
module.exports = router