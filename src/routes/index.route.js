import { Router } from "express";
import userRoutes from "./user.route.js"
import authRoutes from "./auth.route.js";
import ordersRoutes from "./orders.route.js"
import twilioRoutes from "./twilio.route.js"
import sellerRoutes from "./seller.route.js"
import productRoutes from "./product.route.js"
import addressRoutes from "./address.route.js"
import Oauth2Routes from "./oauth.route.js"
import EmailRoutes from "./email.route.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const app = Router({
  mergeParams: true
});

app.use("/auth", authRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/Oauth2", Oauth2Routes);
app.use("/email", EmailRoutes)

app.use("/user", authMiddleware, userRoutes);
app.use("/orders", authMiddleware, ordersRoutes);
app.use("/address", authMiddleware, addressRoutes);
app.use("/twilio", authMiddleware, twilioRoutes);

export default app;