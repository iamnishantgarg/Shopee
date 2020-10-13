const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");
const connectDb = require("./config/db");
const colors = require("colors");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

//db connect
connectDb();

app.use("*", (req, res, next) => {
  // res.se
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/products", (req, res, next) => {
  return res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  return res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`.yellow.bold.underline);
});
