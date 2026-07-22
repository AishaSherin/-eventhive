const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST,
  port: Number(process.env.ETHEREAL_PORT),
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.ETHEREAL_USER,
      to,
      subject,
      html,
    });

    console.log("Email preview: " + nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error("Email send failed:", error.message);
  }
};

module.exports = sendEmail;
