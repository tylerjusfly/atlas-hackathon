const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/category");

/* GET home page. */
router.post("/", createCategory);

module.exports = router;
