import { Router } from "express";
import {
  createOrder,
  getAllOrder,
  getByIdOrder,
  updateOrder,
} from "../controllers/order.js";

const routerOrder = Router();

routerOrder.post("/orders", createOrder);
routerOrder.get("/orders", getAllOrder);

routerOrder.get("/orders/:userId/:orderId", getByIdOrder);
routerOrder.put("/orders/:userId/:orderId", updateOrder);
export default routerOrder;
