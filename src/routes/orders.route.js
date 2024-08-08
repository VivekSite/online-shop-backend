import { Router } from "express";
import { getOrdersByUserId, createOrder, CancelOrderHandler } from "../controllers/orders.controller.js";

const app = Router({
  mergeParams: true,
})

app.get('/', getOrdersByUserId)
app.post('/add', createOrder)
app.patch('/:orderId', CancelOrderHandler)

export default app;