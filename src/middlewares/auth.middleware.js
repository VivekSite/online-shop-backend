import {
  emailValidator,
  passwordValidator,
} from "../validations/auth.validation.js";
import { AppConfig } from "../env.config.js";
import jwt from "jsonwebtoken"
import { apikeyModel } from "../models/admin/apikey.model.js";
import { compare } from "../utils/hash.util.js";

const validateRegistrationBody = (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate Name
  if (!name || name.length < 3) {
    return res.status(400).json({
      message: "Name must be at least of 3 characters",
    });
  }

  // Validate Email
  if (!email) {
    return res.status(400).json({
      message: "Email is required!",
    });
  } else {
    if (!emailValidator(email)) {
      return res.status(400).json({
        message: "Invalid email!",
      });
    }
  }

  // Validate password
  if (!password) {
    return res.status(400).json({
      message: "Password is required!",
    });
  } else {
    if (!passwordValidator(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
    }
  }

  next();
};

const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body;

  // Validate Email
  if (!email) {
    return res.status(400).json({
      message: "Email is required!",
    });
  }

  // Validate password
  if (!password) {
    return res.status(400).json({
      message: "Password is required!",
    });
  }

  next();
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7); // Remove "Bearer " from the beginning

    return jwt.verify(token, AppConfig.AUTH.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({
        success: false,
        message: 'Invalid Auth'
      })

      req.auth = decoded;
      next()
    })
  }

  return res.status(403).json({
    success: false,
    message: "Authorization Required",
  });
};

const CheckForApiKey = async (req, res, next) => {
  const apiKey = req.headers["api-key"];

  if (!apiKey) {
    return res.status(400).json({
      message: "API Key Required!",
    });
  }

  const object_id = AppConfig.PORTFOLIO.KEY_OBJECT_ID;
  const existingApi = await apikeyModel.findOne({ _id: object_id });
  const existingApiKey = compare(existingApi.apikey, apiKey);

  if (!existingApiKey) {
    return res.status(401).send({
      message: "Unauthorized access!"
    })
  }

  next()
}

export { validateRegistrationBody, validateLoginBody, authMiddleware, CheckForApiKey };
