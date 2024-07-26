import { Router } from "express";
import {
  signInHandler,
  signUpHandler,
  verifyToken,
} from "../controllers/auth.controller.js";
import {
  validateRegistrationBody,
  validateLoginBody,
} from "../middlewares/auth.middleware.js";

const app = Router();

app.post("/sign_up", validateRegistrationBody, signUpHandler);
app.post("/sign_in", validateLoginBody, signInHandler);
app.post("/verify", verifyToken);

export default app;
