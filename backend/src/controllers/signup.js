import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const signupSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    "any.required": "Name trường bắt buộc",
    "string.empty": "Name không được bỏ trống",
    "string.min": "Name phải có ít nhất (#limit) ký tự ",
    "string.max": "Name không vượt quá  (#limit) ký tự ",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc ",
    "string.empty": "Email không được bỏ trống ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Password là bắt buộc",
    "string.empty": "Password không được bỏ trống",
    "string.min": "Password có độ dài là (#limit) ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref(`password`)).messages({
    "any.required": "Comfirm là bắt buộc ",
    "any.only": "Password không khớp ",
    "string.empty": "Confirm không được để trống",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "Avatar phải là đường dẫn hợp",
  }),
});

export const signup = async (req, res) => {
  const { email, name, password, avatar } = req.body;
  console.log(req.body);
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ messages });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: ["Email đã tồn tại "] });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  const data = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  data.password = undefined;

  return res.status(StatusCodes.CREATED).json({
    data,
    message: ["bạn đã đăng ký thành công"],
  });
};
const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc ",
    "string.empty": "Email không được bỏ trống ",
  }),
  password: Joi.string().min(3).required().messages({
    "any.required": "Password là bắt buộc",
    "string.empty": "Password không được bỏ trống",
  }),
});
export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const { error } = signinSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((item) => item.message);
    console.log(messages);
    return res.status(StatusCodes.BAD_REQUEST).json({ messages });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      messages: ["Email không tồn tại"],
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }
  const token = jwt.sign({ userId: user._id }, "123456", {
    expiresIn: "7d",
  });
  return res.status(StatusCodes.OK).json({
    user,
    token,
    messages: ["bạn đã đăng ký thành công"],
  });
};
// export const logout = async (req, res) => {};
