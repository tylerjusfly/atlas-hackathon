const express = require("express");
const router = express.Router();
const { createProduct, injectRandomProducts } = require("../controllers/product");

/* GET users listing. */
router.post("/", createProduct);

/* Inject random products. */
router.post("/inject", injectRandomProducts);

module.exports = router;
