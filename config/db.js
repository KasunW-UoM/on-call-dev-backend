require("dotenv").config();

const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

const connectDb = new Promise((resolve, reject) => {
  return mongoose.connect(
    DATABASE_URL,
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        console.log("Connection to Database failed!");
        reject("Connection to Database failed!");
      } else {
        console.log("Database connection successful");
        resolve("Database connection successful");
      }
    }
  );
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = { connectDb };
