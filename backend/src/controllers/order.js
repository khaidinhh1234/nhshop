import Order from "../models/Order.js";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, customerInfo, totalPrice } = req.body;

    const order = await Order.create({
      userId,
      items,
      customerInfo,
      totalPrice,
    });
    return res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const data = await Order.find(req.body);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getByIdOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "order: not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "order: not found" });
    }
    const data = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "order:not found" });
    }
    if (order.status === "pending") {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Order cannot be deleted" });
    }
    const data = await Order.findByIdAndDelete({ userId, _id: orderId });
    res.status(StatusCodes.OK).json({ error: "Order deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
