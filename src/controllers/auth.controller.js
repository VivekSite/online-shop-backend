import { userModel } from "../models/user.model.js";
import { AppConfig } from "../env.config.js";
import { createHash, compare } from "../utils/hash.util.js";
import jwt from "jsonwebtoken";

export const signUpHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(409).send({
        message: `User with email ${email} already exists`,
      });
    }

    const hashedPassword = createHash(password);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Sign a token
    const token = jwt.sign(
      { name, email, _id: newUser._id, image: newUser.profileImage },
      AppConfig.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    return res.status(200).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).send({
        message: `User with email ${email} not found`,
      });
    }

    const isPasswordCurrect = compare(existingUser.password, password);
    if (!isPasswordCurrect) {
      return res.status(401).json({
        message: "Wrong password!",
      });
    }

    // Sign a token
    const token = jwt.sign(
      { name: existingUser.name, email, _id: existingUser._id, image: existingUser.profileImage },
      AppConfig.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body

    if(!token) {
      return res.status(400).json({
        message: "Invalid token"
      })
    }

    const decoded = jwt.verify(token, AppConfig.JWT_SECRET);

    return res.status(200).json({
      decoded
    })
  } catch (error) {
    return res.status(500).json({
      message: "Invalid token",
      error: error.message
    })
  }
};
