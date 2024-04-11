import { Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getAllProducts,
  getById,
  related,
  updateById,
} from "../controllers/products";

const route = Router();

route.get("/products", getAllProducts);
route.get("/productsall", getAll);
route.get("/products/:id", getById);
route.post("/products", create);
route.get("/products/:categoryId/related", related);
route.delete("/products/:id", deleteById);
route.put("/products/:id", updateById);

export default route;
