import crypto from "crypto";
import { AppConfig } from "../env.config.js";

const generateOTP = (userId = "") => {
  if (!AppConfig.AUTH.OTP_SECRET) {
    throw new Error("OTP_SECRET not found!");
  }

  const secret = AppConfig.AUTH.OTP_SECRET;

  const randomBytes = crypto.randomBytes(3);
  const timestamp = Date.now();
  const bufferData = Buffer.concat([randomBytes, Buffer.from(userId.toString()), Buffer.from(timestamp.toString())]);

  const hash = crypto.createHash('sha256');
  const combinedHash = hash.update(bufferData);
  const updatedHash = combinedHash.update(secret);
  const finalHash = updatedHash.digest('hex');

  const OTP = parseInt(finalHash, 16) % 1000000;

  return {
    bufferData,
    otp: OTP,
  }
}

const compareOTP = (bufferData, otp) => {
  if (!AppConfig.AUTH.OTP_SECRET) {
    throw new Error("OTP_SECRET not found!");
  }

  const secret = AppConfig.AUTH.OTP_SECRET;

  const hash = crypto.createHash('sha256');
  const combinedHash = hash.update(bufferData);
  const updatedHash = combinedHash.update(secret);
  const finalHash = updatedHash.digest('hex');
  
  const OTP = parseInt(finalHash, 16) % 1000000;

  return OTP === otp;
}

export {
  generateOTP,
  compareOTP
}