const express = require("express");
const router = express.Router();

//connect Routes
const indexRouter = require("./index");
const usersRouter = require("./users");

// Register routes
router.use("/", indexRouter);
router.use("/users", usersRouter);

module.exports = router;
