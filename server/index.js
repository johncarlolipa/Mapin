require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express");
const connectDB = require("./connectDB");
const app = express();


// middleware
connectDB();

app.listen(8000, () => {
  console.log("server is running");
});
