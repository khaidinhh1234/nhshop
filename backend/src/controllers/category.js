import { StatusCodes } from "http-status-codes";
import Category from "../models/Category";
import Product from "../models/Product";
import slugify from "slugify";
export const getAll = async (req, res) => {
  try {
    const data = await Category.find({});
    if (data.length == 0) {
      return res.status(StatusCodes.OK).json(" Không có danh mục nào !");
    }
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
//Lấy tất cả sp trong danh mục
export const getById = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    const category = await Category.findById(req.params.id);
    if (category.length == 0) {
      return res.status(StatusCodes.OK).json(" Không có danh mục này !");
    }
    return res.status(StatusCodes.OK).json({ category, products });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const deleteById = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (data.length == 0) {
      return res.status(StatusCodes.OK).json(" Không có danh mục này !");
    }
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const create = async (req, res) => {
  try {
    const data = await Category.create({
      name: req.body.name,
      slug: slugify(req.body.name, "-"),
    });
    console.log(data);
    return res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const update = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
