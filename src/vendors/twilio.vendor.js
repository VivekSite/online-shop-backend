import twilio from "twilio"
import { AppConfig } from "../env.config.js";

const accountSid = AppConfig.TWILIO.ACCOUNT_SID;
const authToken = AppConfig.TWILIO.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendOTP(mobile_number, otp) {
  await client.messages.create({
    body: `Dear User, Your OTP is ${otp} for online shop.`,
    from: "whatsapp:+14155238886",
    to: `whatsapp:+91${mobile_number}`,
  });
}

async function sendMessage(mobile_number, message) {
  return await client.messages.create({
    body: message,
    from: "whatsapp:+14155238886",
    to: `whatsapp:+91${mobile_number}`,
  });
}

export {
  sendOTP,
  sendMessage
}