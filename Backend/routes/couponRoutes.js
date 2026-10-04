const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createCoupon,
  getCoupons,
  applyCoupon,
} = require("../controllers/couponController");

// Admin
router.post("/", auth, admin, createCoupon);

// User
router.get("/", getCoupons);
router.post("/apply", auth, applyCoupon);

module.exports = router;