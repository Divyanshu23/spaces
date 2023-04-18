const express = require("express")
const queryController = require("../controllers/query")
const validateToken = require("../middleware/validateToken")

const router = express.Router()
console.log('query req is successful till router');

router.get("/query", [validateToken], queryController)

 

module.exports = router
