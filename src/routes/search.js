const express = require("express");
const router = express.Router();
const { searchProducts, searchAutoComplete } = require("../controllers/search");

/* Search Products */
router.get("/", searchProducts);

/* Search Products */
router.get("/auto_complete", searchAutoComplete);

module.exports = router;
