const router = require("express").Router();
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// @desc  Fetch all Products
// @route /api/products
// @access public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    return res.json(products);
  })
);

// @desc  Fetch single Product
// @route /api/products/:id
// @access public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    else return res.status(404).json({ message: "Product not found" });
  })
);

module.exports = router;
