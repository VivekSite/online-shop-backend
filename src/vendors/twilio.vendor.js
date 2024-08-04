import twilio from "twilio"
import { AppConfig } from "../env.config.js";

const accountSid = AppConfig.TWILIO.ACCOUNT_SID;
const authToken = AppConfig.TWILIO.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendMessage(mobile_number, otp) {
  await client.messages.create({
    body: `Dear User, Your OTP is ${otp} for online shop.`,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${mobile_number}`,
  });
}

export {
  sendMessage
}