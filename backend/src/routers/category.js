import { Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../controllers/category";

const route = Router();

route.get("/category", getAll);
route.get("/category/:id", getById);
route.post("/category", create);
route.put("/category/:id", update);
route.delete("/category/:id", deleteById);
export default route;
