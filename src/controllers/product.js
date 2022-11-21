const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { handleBadRequest, successHandler, handleError } = require("./constants");
const { uniqueId } = require("../utils/utils");

exports.createProduct = async (req, res) => {
  const { name, description, price, unit, category } = req.body;

  try {
    const categoryId = await Category.findById(category);

    if (!categoryId) return handleBadRequest(res, "Category not found", 404);

    let product = await Product.create({
      name,
      description,
      price,
      unit,
      category: categoryId.id,
    });

    await product.save();

    return successHandler(res, "product created", product, true);
  } catch (error) {
    return handleError(res, error, 500);
  }
};
