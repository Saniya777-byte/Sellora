const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/", protect, admin, getAllOrders);

router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
