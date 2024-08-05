import { Router } from "express";
import { getOrdersByUserId, createOrder } from "../controllers/orders.controller.js";

const app = Router({
  mergeParams: true,
})

app.get('/', getOrdersByUserId)
app.post('/add', createOrder)

export default app;