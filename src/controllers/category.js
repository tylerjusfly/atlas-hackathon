const Category = require("../models/category.model");
const { handleBadRequest, handleError, successHandler } = require("./constants");
const { convertToSlug, removeWhiteSpaces } = require("../utils/utils");

exports.createCategory = async (req, res) => {
  let { name } = req.body;

  try {
    if (!name) return handleBadRequest(res, "All fields are Required!", 400);

    let categorySlug = convertToSlug(name);

    let existing = await Category.findOne({ where: { slug: categorySlug } });

    if (existing) return handleBadRequest(res, "category type already exists", 400);

    const result = await Category.create({
      name: removeWhiteSpaces(name),
      slug: categorySlug,
    });

    //remove __version
    delete result.__v;

    await result.save();

    return successHandler(res, "created", result, true);
  } catch (error) {
    return handleError(res, error, 400);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const result = await Category.find();
    if (result.length) return successHandler(res, "found", result);

    return handleBadRequest(res, "not found", 400);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getCategoriesInternal = async () => {
  try {
    const result = await Category.find();
    return result;
  } catch (error) {
    handleError(res, error);
  }
};
