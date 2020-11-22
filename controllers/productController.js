const asyncHandler = require("express-async-handler");
const { create } = require("../models/productModel");
const Product = require("../models/productModel");

// @desc  Fetch all Products
// @route /api/products
// @access public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
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

// @desc  Delete Product by Id
// @route DELETE  /api/products/:id
// @access Private/Admin

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ message: "Product removed " });
  } else return res.status(404).json({ message: "Product not found" });
});

// @desc  Add a Product
// @route POST  /api/products/
// @access Private/Admin

exports.addProduct = asyncHandler(async (req, res, next) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpeg",
    brand: "Sample Brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  return res.status(201).json(createdProduct);
});

// @desc  Upddate Product by Id
// @route PUT  /api/products/:id
// @access Private/Admin

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.price = price;
    product.image = image;
    product.countInStock = countInStock;
    product.description = description;
    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } else return res.status(404).json({ message: "Product not found" });
});

// @desc  Create a review
// @route POST  /api/products/:id/reviews
// @access Private

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = await product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.review.push(review);
    product.numReviews = product.review.length;
    product.rating =
      product.review.reduce((acc, item) => {
        return acc + item.rating;
      }, 0) / product.review.length;
    await product.save();
    res.status(201);
    return res.json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});
