import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
      uniqui: true,
      lowercase: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Category", CategorySchema);
