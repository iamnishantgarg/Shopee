const router = require("express").Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const { protect, ensureAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, addOrderItems);
router.get("/", protect, ensureAdmin, getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay/", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, ensureAdmin, updateOrderToDelivered);

module.exports = router;
