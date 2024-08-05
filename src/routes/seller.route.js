import { Router } from "express";
import { createHandler, getMerchantNameById } from "../controllers/seller.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const app = Router();

app.post('/', authMiddleware,  createHandler);
app.get('/merchant_name', authMiddleware, getMerchantNameById);

export default app;