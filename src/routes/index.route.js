import { Router } from "express";
import userRoutes from "./user.route.js"
import authRoutes from "./auth.route.js";
import ordersRoutes from "./orders.route.js"
import sellerRoutes from "./seller.route.js"
import productRoutes from "./product.route.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const app = Router({
  mergeParams: true
});

app.use("/auth", authRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/user", authMiddleware, userRoutes);
app.use("/orders", authMiddleware, ordersRoutes);

export default app;