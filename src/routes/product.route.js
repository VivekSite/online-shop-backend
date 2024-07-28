import { Router } from "express";
import { createHandler } from "../controllers/product.controller.js";

const app = Router({
  mergeParams: true
});

app.post('/', createHandler)

export default app;