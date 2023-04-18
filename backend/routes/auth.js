const express = require("express")
const { body } = require('express-validator')

const signup = require("../controllers/signup")
const login = require("../controllers/login")
// const getuser = require("../controllers/getUser")
const validateToken = require("../middleware/validateToken")

const router = express.Router()
console.log('req is successful');
router.post("/signup", 
    // [ body("name", "Name can't be empty").isLength({ min: 1 }),
    [body("email").isEmail(),
    body("password", "Password should be atleast 6 characters long").isLength({ min: 6 })],
    signup
)

router.post("/login", [body("email").isEmail(),
    body("password", "Password must at least be 6 characters long").isLength({ min: 6 })],
    login
)

// router.get("/getuser", [validateToken], getuser)

module.exports = router