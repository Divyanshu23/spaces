const nodemailer = require("nodemailer");
const { MAIL_SETTINGS } = require("../constants/constants");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: "Booking Cancelled", // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>IMPORTANT</h2>
        <h4>Dear Student,</h4>
        <h4>We would like to bring to your notice that your booking for ${params.type}${params.h} on ${params.d} from ${params.s} to ${params.e} has been cancelled. Please contact the LHC office for more information.</h4>
    
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.sendOTPMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to, // list of receivers
      subject: "Hello ✔", // Subject line
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h3>Hi!</h3>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you did not request for verification please do not respond to the mail.</p>
      </div>
    `,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};