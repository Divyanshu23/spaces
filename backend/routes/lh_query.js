const express = require("express")
const checkAvailableLHCs = require("../controllers/checkAvailableLHCs")
const checkAvailableLabs = require("../controllers/checkAvailableLabs")
const validateToken = require("../middleware/validateToken")

const router = express.Router()

router.get("/checkLHCs", [validateToken], checkAvailableLHCs)
router.get("/checkLabs", [validateToken], checkAvailableLabs)
 

module.exports = router
