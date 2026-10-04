const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Add Review
router.post("/", auth, addReview);

// Get Product Reviews
router.get("/:productId", getReviews);

// Delete Review
router.delete("/:id", auth, deleteReview);

module.exports = router;