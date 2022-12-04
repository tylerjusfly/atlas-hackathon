const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 32 },
    description: { type: String, required: true, maxlength: 2000 },
    image: { type: String, maxlength: 9000 },
    price: { type: Number, trim: true, required: true, maxlength: 32 },
    unit: { type: Number },
    category: { type: ObjectId, ref: "Category", required: true },
    specifications: {},
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
