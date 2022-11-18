const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 32 },
    type: { type: ObjectId, ref: "Category", required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
