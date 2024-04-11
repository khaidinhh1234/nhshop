import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";
export const create = async (req, res) => {
  try {
    const data = await Product.create(req.body);
    console.log(data);
    return res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await Product.find({});
    if (data.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ["không có sản phẩm vào "] });
    }
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const getAllProducts = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "asc",
    _expand,
  } = req.query;
  console.log(_page);
  const options = {
    page: _page,
    limit: _limit,
    sort: { [_sort]: _order === "desc" ? -1 : 1 },
  };
  const populateOptions = _expand ? [{ path: "category", select: "name" }] : [];
  try {
    const result = await Product.paginate(
      { categoryId: null },
      { ...options, populate: populateOptions }
    );
    if (result.docs.length === 0) throw new Error("No products found");
    const response = {
      data: result.docs,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalItems: result.totalDocs,
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export const getById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const related = async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.categoryId });
    console.log(product);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
export const deleteById = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const updateById = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};
