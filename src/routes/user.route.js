import { Router } from "express";
import {
  addToCartHandler,
  getCartDataHandler,
  GetUserDataHandler,
  ProductSelectionHandler,
  UpdateProductQuantityHandler
} from "../controllers/user.controller.js";

const app = Router({
  mergeParams: true,
})

app.post('/cart', addToCartHandler);
app.get('/cart', getCartDataHandler);
app.put('/cart/toggle_selection', ProductSelectionHandler);
app.put('/cart/update_quantity', UpdateProductQuantityHandler);

app.get("/", GetUserDataHandler);

export default app;