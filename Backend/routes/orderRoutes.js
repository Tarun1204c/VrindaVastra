const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

// Place Order
router.post("/", auth, placeOrder);

// IMPORTANT: my-orders pehle aayega
router.get("/my-orders", auth, getMyOrders);

// Get Single Order
router.get("/:id", auth, getOrderById);

// Update Status
router.put("/:id", auth, updateOrderStatus);

// Cancel Order
router.put("/cancel/:id", auth, cancelOrder);

module.exports = router;