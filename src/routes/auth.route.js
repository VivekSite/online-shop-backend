import { Router } from "express";
import {
  signInHandler,
  signUpHandler,
  verifyToken,
  sendOTPHandler,
  verifyOTPHandler
} from "../controllers/auth.controller.js";
import {
  validateRegistrationBody,
  validateLoginBody,
  authMiddleware,
} from "../middlewares/auth.middleware.js";

const app = Router();

app.post("/sign_up", validateRegistrationBody, signUpHandler);
app.post("/sign_in", validateLoginBody, signInHandler);
app.post("/verify", verifyToken);

app.post("/otp", authMiddleware, sendOTPHandler);
app.post("/verify/otp", authMiddleware, verifyOTPHandler);

export default app;
