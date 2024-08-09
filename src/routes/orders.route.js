import { Router } from "express";
import { getOrdersByUserId, createOrder, CancelOrderHandler, getOrdersByIdHandler } from "../controllers/orders.controller.js";

const app = Router({
  mergeParams: true,
})

app.get('/', getOrdersByUserId)
app.get('/:orderId', getOrdersByIdHandler)
app.post('/add', createOrder)
app.patch('/:orderId', CancelOrderHandler)

export default app;