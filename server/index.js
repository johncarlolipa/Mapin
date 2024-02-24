require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./connectDB");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

app.use(express.json());

// cors
app.use(cors({
  origin: 'https://mapin-p829.vercel.app/'
}));

// middleware
connectDB();

// routes
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("*", (req, res) => {
  res.json("404");
});

app.listen(8000, () => {
  console.log("server is running");
});
