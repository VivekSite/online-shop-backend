import { Router } from "express";
import authRoutes from "./auth.route.js";

const app = Router({
  mergeParams: true
});

app.use("/auth", authRoutes);

export default app;