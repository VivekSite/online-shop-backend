import { Router } from "express";
import authRoutes from "./auth.route.js";
import sellerRoutes from "./seller.route.js"
import productRoutes from "./product.route.js"

const app = Router({
  mergeParams: true
});

app.use("/auth", authRoutes);
app.use("/seller",sellerRoutes);
app.use("/product", productRoutes);

export default app;