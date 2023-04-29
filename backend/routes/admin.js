const express = require("express")
const { body } = require('express-validator')

const adminsignup = require("../controllers/adminsignup")
const adminlogin = require("../controllers/adminlogin")
const getLHCs = require("../controllers/getlhcs")
const getLabs = require("../controllers/getLabs")
const getUserBookings = require("../controllers/getBookings")
const validateToken = require("../middleware/validateToken")
const validateAdmin = require("../middleware/validateAdmin")

const router = express.Router()

router.post("/adminsignup",
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
    adminsignup
)
router.get("/adminlogin",[validateToken], adminlogin)
router.get("/userbookings", [validateAdmin], getUserBookings)
router.get("/lhcbookings", [validateAdmin], getLHCs)
router.get("/labbookings", [validateAdmin], getLabs)
 
module.exports = router