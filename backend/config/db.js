import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("kết nối thành công đến db");
  } catch (error) {
    console.log(error);
  }
};
