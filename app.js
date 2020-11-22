const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const products = require("./data/products");
const orderRoute = require("./routes/orderRoutes");
const productRoute = require("./routes/productRoute");
const uploadRoute = require("./routes/uploadRoutes");
const userRoute = require("./routes/userRoutes");
const connectDb = require("./config/db");
const colors = require("colors");
const morgan=require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { request } = require("express");
const app = express();
dotenv.config();
const PORT = process.env.PORT;

//db connect
connectDb();

app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");

  next();
});

if(process.env.NODE_ENV==='developement'){
app.use(morgan('dev'));
}

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/products", productRoute);
app.use("/api/orders/", orderRoute);

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
//404 fallback

app.use(notFound);

//error handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`.yellow.bold.underline);
});
