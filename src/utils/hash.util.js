import crypto from "crypto";
import { AppConfig } from "../env.config.js";

const createHash = (data) => {
  if (!AppConfig.HASH_SECRET) {
    throw new Error("HASH_SECRET is not found");
  }

  const salt = AppConfig.HASH_SECRET;

  const hash = crypto.createHash("sha256");
  hash.update(data);
  hash.update(salt);
  const hashedData = hash.digest("hex");

  return hashedData.toString();
};

const compare = (hashedData, data) => {
  return createHash(data) === hashedData;
};

export { createHash, compare };
