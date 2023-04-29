require("dotenv").config();
module.exports = {
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
