const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { handleBadRequest, successHandler, handleError } = require("./constants");
const { uniqueId, generateFakeProducts } = require("../utils/utils");
const { faker } = require("@faker-js/faker");
const { getCategories, getCategoriesInternal } = require("./category");

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

exports.injectRandomProducts = async (req, res) => {
  try {
    let { count } = req.body;
    // return successHandler(res, undefined, await getCategoriesInternal());
    if (count) {
      const products = await generateFakeProducts(count);
      console.log(products);
      const result = await Product.insertMany(products);
      if (result) {
        return successHandler(res, "created", result, true);
      } else {
        return handleBadRequest(res, "not created", 500);
      }
    }
    return handleBadRequest(res, "please enter a valid count in payload", 400);
  } catch (error) {
    return handleError(res, error, 500);
  }
};
