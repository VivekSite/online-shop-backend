import { Router } from "express";
import { createHandler } from "../controllers/seller.controller.js";

const app = Router();

app.post('/', createHandler);

export default app;