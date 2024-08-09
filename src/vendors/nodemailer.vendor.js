import { createTransport } from "nodemailer"
import { AppConfig } from "../env.config.js"

const user = AppConfig.GOOGLE_OAUTH.SENDER;
const pass = AppConfig.GOOGLE_OAUTH.PASS_KEY

const transporter = new createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user,
    pass
  }
})

const sendGmail = async (to, subject, text) => {
  const mailOptions = {
    from: user,
    to,
    subject,
    text,
  };

  return await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

export {
  sendGmail
}

