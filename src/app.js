import express from 'express';
import cors from 'cors';
import appRoutes from "./routes/index.route.js";

const app = express();

app.use(
  express.urlencoded({
    limit: "80mb",
    extended: false,
  })
);
app.use(express.json({
  limit: "80mb",
}));
app.use(cors());
app.use(express.static('./static'))

app.use("/api/v1", appRoutes);
export default app;