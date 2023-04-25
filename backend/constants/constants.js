require("dotenv").config();
module.exports = {
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: 'cs315spacesiitk@gmail.com', // process.env.MAIL_EMAIL,
      pass: 'eccqrqzkcwpdskfe' ,
    },
  },
};
