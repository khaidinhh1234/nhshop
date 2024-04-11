import { Router } from "express";
import {
  AddtoCart,
  Updatequality,
  decreaseProductQuanlity,
  getcartUserId,
  increaseProductQuanlity,
  removecartUserId,
} from "../controllers/cart";

const route = Router();

route.get("/carts/:userId", getcartUserId);
route.post("/carts/add-to-cart", AddtoCart);
route.delete("/carts/remove-to-cart", removecartUserId);
route.post("/carts/update-quality", Updatequality);
route.put("/carts/increase", increaseProductQuanlity);
route.put("/carts/decrease", decreaseProductQuanlity);
export default route;
