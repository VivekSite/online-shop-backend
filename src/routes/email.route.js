import { Router } from "express";
import { sendGmail } from "../vendors/nodemailer.vendor.js";

const app = Router({
  mergeParams: true,
})

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to) {
    return res.status(400).send({
      success: false,
      message: "Recipients gmail address is required!"
    })
  }

  if (!subject) {
    return res.status(400).send({
      success: false,
      message: "Subject can not be empty!"
    })
  }

  if (!text) {
    return res.status(400).send({
      success: false,
      message: "Email Body can not be empty!"
    })
  }

  await sendGmail(to, subject, text);

  return res.status(200).send({
    success: true,
    message: "Gmail sent successfully"
  });
})

export default app