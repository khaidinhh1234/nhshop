import express from "express";
import authorRouter from "./routers/auth.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import cartRouter from "./routers/cart.js";
import AttributeRouter from "./routers/attribute.js";
import { connectDB } from "../config/db";
import cors from "cors";
import dotenv from "dotenv";

import morgan from "morgan";
import routerOrder from "./routers/order.js";
dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//connect DB
connectDB("mongodb://localhost:27017/xuongnodejs");
//router
app.use("/api/v1", authorRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", AttributeRouter);
app.use("/api/v1", routerOrder);
//
export const viteNodeApp = app;
