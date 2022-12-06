const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/category");

/* GET home page. */
router.post("/", createCategory);

/* GET home page. */
router.get("/", getCategories);

module.exports = router;
