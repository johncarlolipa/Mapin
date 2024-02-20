require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB");
const app = express();
const pinRoute = require("./routes/pins")

app.use(express.json());


// middleware
connectDB();

// routes
app.use("/api/pins", pinRoute);

app.listen(8000, () => {
  console.log("server is running");
});
