///kiểm tra giỏ hàng  có tồn tại chưa dựa theo UserId
//Nếu giỏ hàng chưa tồn tại tạo ra giỏ hàng mới
//kiểm tra có sản phẩm có tồn tại hay không ?
//nếu có tồn tại thì cập nhật  số lượng
// nếu không tồn tại thì ta thêm mới
// lưu vào server
import { StatusCodes } from "http-status-codes";
import Cart from "../models/cart";

export const getcartUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    const cartdata = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quality: item.quality,
      })),
    };
    return res.status(StatusCodes.OK).json({ products: cartdata.products });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
export const removecartUserId = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId, productId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Không tồn tại Cart" });
    }
    cart.products = await cart.products.filter(
      (item) => item.productId && item.productId.toString() !== productId
    );
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
export const AddtoCart = async (req, res) => {
  const { userId, productId, quality } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const sp = await cart.products.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (sp !== -1) {
      cart.products[sp].quality += quality;
    } else {
      cart.products.push({ productId, quality });
    }
    await cart.save();
    res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const Updatequality = async (req, res) => {
  console.log("ahihih");
  const { userId, quality, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "UserId không tồn tại " });
    }
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "products không tồn tại " });
    }
    product.quality = quality;
    await cart.save();
    res.status(StatusCodes.OK).json({ products: cart.products });
  } catch (error) {
    res.status(StatusCodes.OK).json(error);
  }
};
export const increaseProductQuanlity = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(userId, productId);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart không tồn tại " });
    }
    console.log(cart);
    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sản phẩm không tồn tại " });
    }
    console.log(product);

    product.quality++;
    await cart.save(), res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
export const decreaseProductQuanlity = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart không tồn tại " });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Sản phẩm không tồn tại " });
    } else if (product.quality <= 0) {
      const data = await cart.products.findIdanddelete(productId);
      res
        .status(StatusCodes.NOT_FOUND)
        .json(data, { message: "Sản phẩm đã bị loại bỏ  " });
    }
    product.quality--;
    await cart.save(), res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
