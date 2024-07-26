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
  JWT_SECRET: process.env.JWT_SECRET,
  HASH_SECRET: process.env.HASH_SECRET,
}