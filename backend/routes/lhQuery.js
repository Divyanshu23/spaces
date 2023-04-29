const express = require("express")

const validateTokenIfAvailable = require("../middleware/validateTokenIfAvailable")
const checkAvailableLHCs = require("../controllers/checkAvailableLHCs")
const checkAvailableLHC = require("../controllers/checkAvailableLHC")

const router = express.Router()

router.get("/checkLHCs",[validateTokenIfAvailable], checkAvailableLHCs)
router.get("/checkLHC",[validateTokenIfAvailable], checkAvailableLHC)
 

module.exports = router
