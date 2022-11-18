const express = require("express");
const router = express.Router();

var indexRouter = require('./index');
var usersRouter = require('./users');



// Register routes
router.use('/', indexRouter);
router.use('/users', usersRouter);


module.exports = router