const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// send OTP email
const sendOTPEmail = async ({ to, otp }) => {
  const html = `<p>Your ClubNexus OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`;
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Your ClubNexus OTP',
    html
  });
};

module.exports = { sendOTPEmail };
