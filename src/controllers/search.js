const Product = require("../models/product.model");
const { handleBadRequest, handleError, successHandler } = require("./constants");

exports.searchProducts = async (req, res) => {
  try {
    const { term } = req.query;
    let pipeline = [
      {
        $search: {
          index: "searchProducts",
          text: {
            query: `{ name: { $eq: ${term} } }`,
            path: "name",
            fuzzy: {},
          },
        },
      },
    ];

    const result = await Product.aggregate(pipeline);
    if (result) return successHandler(res, "found", result);
    return handleBadRequest(res, "not found", 400);
  } catch (error) {
    return handleError(res, error, 400);
  }
};

exports.searchAutoComplete = async (req, res) => {
  try {
    const { term } = req.query;
    let pipeline = [
      {
        $search: {
          index: "searchProductsAutocomplete",
          autocomplete: {
            query: term,
            path: "name",
            fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 256 },
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: 1,
        },
      },
    ];
    const result = await Product.aggregate(pipeline);
    if (result) return successHandler(res, "found", result);
    return handleBadRequest(res, "not found", 400);
  } catch (error) {
    return handleError(res, error, 400);
  }
};
