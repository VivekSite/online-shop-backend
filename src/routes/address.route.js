import { Router } from "express";
import {
  CreateHandler,
  GetHandler,
  DeleteHandler,
  MakeDefaultHandler,
  UpdateAddressHandler
} from "../controllers/address.controller.js";
import { VerifyAddressBody } from "../middlewares/address.middleware.js";

const app = Router({
  mergeParams: true
});

app.post('/create', VerifyAddressBody, CreateHandler);
app.get('/', GetHandler);
app.delete('/:addressId', DeleteHandler);
app.put("/:addressId", UpdateAddressHandler);
app.patch('/make_default/:addressId', MakeDefaultHandler)

export default app;