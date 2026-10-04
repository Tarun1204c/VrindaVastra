const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController");

router.post("/", auth, addAddress);

router.get("/", auth, getAddresses);

router.put("/:id", auth, updateAddress);

router.delete("/:id", auth, deleteAddress);

router.put("/default/:id", auth, setDefaultAddress);

module.exports = router;