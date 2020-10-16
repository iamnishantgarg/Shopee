const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc  Fetch all Products
// @route /api/products
// @access public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  return res.json(products);
});

// @desc  Fetch single Product
// @route /api/products/:id
// @access public

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else return res.status(404).json({ message: "Product not found" });
});
