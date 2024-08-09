import { userModel } from "../models/user.model.js";
import { otpModel } from "../models/otp.model.js"
import { AppConfig } from "../env.config.js";
import jwt from "jsonwebtoken";

import { generateOTP, compareOTP } from "../utils/otp.util.js"
import { createHash, compare } from "../utils/hash.util.js";
import { catchAsync } from "../utils/response.util.js"

import { sendOTP } from "../vendors/twilio.vendor.js";
import { sendGmail } from "../vendors/nodemailer.vendor.js";

export const signUpHandler = catchAsync(async (req, res) => {
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
    AppConfig.AUTH.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );

  return res.status(200).json({
    message: "User created successfully",
    token,
  });
});

export const signInHandler = catchAsync(async (req, res) => {
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
    AppConfig.AUTH.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
});

export const verifyToken = catchAsync(async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({
      message: "Invalid token"
    })
  }

  const decoded = jwt.verify(token, AppConfig.AUTH.JWT_SECRET);

  return res.status(200).json({
    decoded
  })
});

export const sendOTPHandler = catchAsync(async (req, res) => {
  const { _id: user_id, name, email } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { type, mobile_number } = req.body;
  const { otp, bufferData } = generateOTP(mobile_number || email);
  const expiresIn = Date.now() + 1000 * 60 * 10;
  await otpModel.create({
    user_id,
    bufferData,
    for: type,
    exp: expiresIn,
  });

  if (type === "Mobile") {
    if (!mobile_number || mobile_number.length !== 10) {
      return res.status(400).send({
        success: false,
        message: "Invalid mobile number!"
      })
    }

    await sendOTP(phone_number, otp)
    return res.status(200).send({
      success: true,
      message: `OTP is sent on number xxxxxx${phone_number.toString().slice(-4)}`
    })
  }

  await sendGmail(
    email,
    "OTP for Online Shop",
    `Hey, ${name}\n
    Here is your OTP for Online Shop ${otp}
    `
  )

  return res.status(200).send({
    success: true,
    message: "OTP is sent to registered email"
  })
})

export const verifyOTPHandler = catchAsync(async (req, res) => {
  const { _id: user_id } = req.auth;
  if (!user_id) {
    return res.status(401).send({
      success: false,
      message: "Authentication Needed!"
    });
  }

  const { otp } = req.body;
  if (!otp) {
    return res.status(400).send({
      success: false,
      message: "OTP is required!"
    })
  }

  const previousOTP = await otpModel.findOne({
    user_id
  });

  if (!previousOTP) {
    return res.status(404).send({
      success: false,
      message: "OTP not found!"
    })
  };

  if (previousOTP.exp < Date.now()) {
    await otpModel.findByIdAndDelete(previousOTP._id);

    return res.status(400).send({
      success: false,
      message: "OTP has been expired!"
    });
  }

  const bufferData = previousOTP.bufferData;
  const isVerified = compareOTP(bufferData, otp);
  await otpModel.findByIdAndDelete(previousOTP._id);

  if (!isVerified) {
    return res.status(500).send({
      success: false,
      message: "OTP verification failed!"
    })
  }

  if (previousOTP.for === "Mobile") {
    await userModel.findByIdAndUpdate(user_id, {
      isMobileVerified: true,
    })

    return res.status(200).send({
      success: true,
      message: "Mobile number verification successful"
    })
  }
  await userModel.findByIdAndUpdate(user_id, {
    isEmailVerified: true,
  })

  return res.status(200).send({
    success: true,
    message: "Email verification successful"
  })
})
