const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.M0NGO_URL;

// MongoDB Config
const connectDB = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.once("open", (_) => {
    console.log(`Mongo Database Connected`);
  });

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

module.exports = connectDB;
