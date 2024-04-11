import mongoose, { Schema } from "mongoose";

const AtributeShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uniqui: true,
    },
    values: [
      {
        type: Schema.Types.ObjectId,
        ref: "ValueAttribute",
        required: true,
      },
    ],
  },
  { timestamps: false, versionKey: false }
);
export default mongoose.model("Atribute", AtributeShema);

const ValuesAttributeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);
export const ValuesAttributeModel = mongoose.model(
  "ValueAttribute",
  ValuesAttributeSchema
);
