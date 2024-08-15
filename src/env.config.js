import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFilePath = join(__dirname, '.env');
dotenv.config({ path: envFilePath })

export const AppConfig = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
    OTP_SECRET: process.env.OTP_SECRET,
  },
  TWILIO: {
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  },
  PORTFOLIO: {
    RECEIVER: process.env.PORTFOLIO_RECEIVER,
    KEY_OBJECT_ID: process.env.PORTFOLIO_KEY_OBJECT_ID
  },
  GOOGLE_OAUTH: {
    PASS_KEY: process.env.GOOGLE_PASS_KEY,
    SENDER: process.env.SENDER_GMAIL,
    CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    ACCESS_TOKEN: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
    REDIRECT_URI: process.env.GOOGLE_OAUTH_REDIRECT_URI
  }
}