const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoutes");
const connectDb = require("./config/db");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

//db connect
connectDb();

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

//404 fallback

app.use(notFound);

//error handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`.yellow.bold.underline);
});
