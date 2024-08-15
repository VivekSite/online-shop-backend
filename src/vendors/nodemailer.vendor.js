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

const sendEmailFromPortfolio = async (name, email, message) => {
  const mailOptions = {
    from: user,
    to: AppConfig.PORTFOLIO.RECEIVER,
    subject: "Message From Portfolio",
    html: `
      <html>
        <body>
          <div
            style="
              border: 1px solid rgb(164, 164, 164);
              border-radius: 1rem;
              padding: 3rem;
              margin: 0 15rem;
            "
          >
            <p>
              <span
                style="font-weight: 600; font-size: larger; color: rgb(3, 93, 158)"
                >Message From: </span
              >${name}
            </p>
            <p>
              <span
                style="font-weight: 600; font-size: larger; color: rgb(3, 93, 158)"
                >Email: </span
              >${email}
            </p>
            <p style="color: rgb(0, 132, 255)">
              ${message}
            </p>
          </div>
        </body>
      </html>
    `,
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
  sendGmail,
  sendEmailFromPortfolio
}

