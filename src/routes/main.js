const express = require("express");
const router = express.Router();

//connect Routes
const indexRouter = require("./index");
const productRouter = require("./product");
const categoryRouter = require("./category");

// Register routes
router.use("/", indexRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

module.exports = router;
