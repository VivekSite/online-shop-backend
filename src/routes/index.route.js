import { Router } from "express";
import authRoutes from "./auth.route.js";
import sellerRoutes from "./seller.route.js"
import productRoutes from "./product.route.js"
import userRoutes from "./user.route.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const app = Router({
  mergeParams: true
});

app.use("/auth", authRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/user", authMiddleware,  userRoutes);

export default app;