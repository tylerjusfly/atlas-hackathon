const express = require("express");
const router = express.Router();
const { createProduct, injectRandomProducts, findProduct } = require("../controllers/product");

/* GET users listing. */
router.post("/", createProduct);

/* Inject random products. */
router.post("/inject", injectRandomProducts);

/* Find Products */
router.get("/", findProduct);

module.exports = router;
