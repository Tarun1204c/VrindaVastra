const Coupon = require("../models/coupon");

// Create Coupon (Admin)
exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      message: "Coupon Created Successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Apply Coupon
exports.applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid Coupon",
      });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({
        message: "Coupon Expired",
      });
    }

    if (amount < coupon.minAmount) {
      return res.status(400).json({
        message: `Minimum order amount should be ₹${coupon.minAmount}`,
      });
    }

    const discountAmount = (amount * coupon.discount) / 100;
    const finalAmount = amount - discountAmount;

    res.status(200).json({
      originalAmount: amount,
      discount: coupon.discount,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};