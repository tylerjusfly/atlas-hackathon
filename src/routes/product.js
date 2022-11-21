const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/product");

/* GET users listing. */
router.post("/", createProduct);

module.exports = router;
