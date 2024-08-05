import { Router } from "express";
import { CreateHandler, GetHandler } from "../controllers/address.controller.js";
import { VerifyAddressBody } from "../middlewares/address.middleware.js";

const app = Router({
  mergeParams: true
});

app.post('/create', VerifyAddressBody, CreateHandler);
app.get('/', GetHandler);

export default app;