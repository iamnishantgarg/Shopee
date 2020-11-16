const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// @desc  Create new Order
// @route POST /api/orders
// @access private
exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  }
});

// @desc  Get order byid
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  } else if (!req.user.isAdmin) {
    if (order.user.id.toString() !== req.user.id.toString()) {
      res.status(404);
      throw new Error("Order not found");
    } else {
      return res.json(order);
    }
  } else {
    return res.json(order);
  }
});

// @desc  Update Order to paid
// @route GET /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.user._id.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("Order not found");
  } else {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  }
});

// @desc  Update Order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found!");
  }
});

// @desc GET logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc GET all orders
// @route GET /api/orders
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});
