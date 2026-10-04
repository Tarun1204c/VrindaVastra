const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// =======================
// Public Routes
// =======================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// =======================
// Admin Routes
// =======================

// Add Product
router.post(
  "/add",
  auth,
  admin,
  upload.array("image", 5),
  addProduct
);

// Update Product
router.put(
  "/:id",
  auth,
  admin,
  upload.array("image", 5),
  updateProduct
);

// Delete Product
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;