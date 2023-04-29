const express = require("express")
const validateToken = require("../middleware/validateToken")
const validateTokenIfAvailable = require("../middleware/validateTokenIfAvailable")
const checkAvailableLabs = require("../controllers/checkAvailableLabs")
const checkAvailableLab = require("../controllers/checkAvailableLab")

const router = express.Router()

router.get("/checkLabs",[validateTokenIfAvailable], checkAvailableLabs)
router.get("/checkLab",[validateTokenIfAvailable], checkAvailableLab)

module.exports = router
