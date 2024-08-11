import { Router } from "express";
import { SendMessageHandler } from "../controllers/twilio.controller.js";

const app = Router({
  mergeParams: true,
})

app.post('/', SendMessageHandler)

export default app;