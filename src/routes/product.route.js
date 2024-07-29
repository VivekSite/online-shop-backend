import { Router } from "express";
import { createHandler, getHandler, searchHandler } from "../controllers/product.controller.js";

const app = Router({
  mergeParams: true
});

app.post('/', createHandler)
app.get('/', getHandler)
app.get('/search', searchHandler)

export default app;