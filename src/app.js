const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const dotenv = require("dotenv");
const logger = require("morgan");

const allRoutes = require("./routes/main");

const app = express();
app.disable("x-powered-by");
app.enable("trust proxy");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Configure Routers
app.use(allRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const ErrorHandler = async (err, req, res, next) => {
  // Send Errors
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;
  const data = err.data;
  res.status(statusCode).json({ status, message, stack, data });
};

app.use(ErrorHandler);

module.exports = app;
