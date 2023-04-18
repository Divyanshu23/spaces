const User = require("../models/users")

const getuser = async (req, res) => {
    const userid = req.user.userid
    try {
        const user = await User.findById(userid).select("-password")
        res.status(200).json({success:true, user})
    } catch (error) {
        res.status(400).json({success: false, error: "Some internal error occured"})
    }
}

module.exports = getuser