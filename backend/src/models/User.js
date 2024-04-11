import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      requied: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "../upload/avata.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);
