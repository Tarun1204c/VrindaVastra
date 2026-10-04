const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const { getDashboard } = require("../controllers/dashboardController");

router.get("/", auth, admin, getDashboard);

module.exports = router;