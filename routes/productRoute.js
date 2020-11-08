const router = require("express").Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
} = require("../controllers/productController");
const { protect, ensureAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.post("/", protect, ensureAdmin, addProduct);

router.get("/:id", getProductById);

router.delete("/:id", protect, ensureAdmin, deleteProduct);

router.put("/:id", protect, ensureAdmin, updateProduct);

module.exports = router;
