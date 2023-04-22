const express = require("express")
const { body } = require('express-validator')

const signup = require("../controllers/signup")
const login = require("../controllers/login")
// const validateToken = require("../middleware/validateToken")

const router = express.Router()
router.post("/signup",
    [body("name", "Name should be atleast 2 characters long").isLength({ min: 2 }),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .custom((value) => {
            if (!value.endsWith('@iitk.ac.in')) {
                throw new Error('Email must belong to iitk.ac.in domain');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
    body("password", "Password should be atleast 6 characters long").isLength({ min: 6 })],
    signup
)

router.post("/login", [body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .custom((value) => {
        if (!value.endsWith('@iitk.ac.in')) {
            throw new Error('Email must belong to iitk.ac.in domain');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    body("password", "Password should be atleast 6 characters long").isLength({ min: 6 })],
    login
)

module.exports = router