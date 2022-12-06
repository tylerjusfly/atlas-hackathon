const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { handleBadRequest, successHandler, handleError } = require("./constants");
const { generateFakeProducts } = require("../utils/utils");
const { log } = console;

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
    if (count) {
      const products = await generateFakeProducts(count);
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

exports.findProduct = async (req, res) => {
  try {
    const { id, page, category, categoryId } = req.query;
    const limit = +req.query.limit ? +req.query.limit : 10;
    const offset = +page ? (+page - 1) * limit : 0;

    if (categoryId && categoryId != "") {
      let currentCat = await Category.findOne({ _id: categoryId });
      if (!currentCat) return handleBadRequest(res, "category not found", 400);

      let result = await Product.find({ category: categoryId }).limit(limit);
      let total = await Product.find({ category: categoryId });
      total = total.length;

      if (result.length) {
        const paging = {
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        };
        return successHandler(res, "found", result, false, paging);
      }
    }

    if (category && category == "1") {
      let categories = await Category.find();
      if (!categories) {
        return handleBadRequest(res, "categories not found", 400);
      }

      let result = {};
      for (const item of categories) {
        const catName = item.name;
        let products = await Product.find({ categoryId: item._id }).limit(limit).exec();
        result[catName] = products;
      }
      if (result) {
        return successHandler(res, "found", result);
      } else {
        return handleBadRequest(res, "not found", 400);
      }
    }

    if (id && id !== "") {
      let result = await Product.findOne({ _id: id });
      if (result) {
        return successHandler(res, "found", result);
      }
      return handleBadRequest(res, "not found", 400);
    }

    let result = await Product.find().limit(limit).skip(offset).exec();
    let total = await Product.find();
    total = total.length;

    if (result.length) {
      const paging = {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      };
      return successHandler(res, "found", result, false, paging);
    }
    return handleBadRequest(res, "not found", 500);
  } catch (error) {
    return handleError(res, error, 400);
  }
};
