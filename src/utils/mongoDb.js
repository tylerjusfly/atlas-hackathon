const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/jumiaclone";

// MongoDB Config
const connectDB = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.once("open", (_) => {
    console.log(`Mongo Database connected: ${url}`);
  });

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

module.exports = connectDB;
