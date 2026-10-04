require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const auth = require("./middleware/authMiddleware");

const app = express();

connectDB();

// ==========================
// CORS
// ==========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-website-vrindavastra-jxw.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests without origin
      // e.g. Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    optionsSuccessStatus: 204,
  })
);



// ==========================
// Body Parser
// ==========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ==========================
// Static uploads
// ==========================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ==========================
// Routes
// ==========================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/users", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/dashboard", dashboardRoutes);


// ==========================
// Protected Test Route
// ==========================

app.get("/api/profile", auth, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});


// ==========================
// Home
// ==========================

app.get("/", (req, res) => {
  res.send("🚀 VrindaVastra API Running...");
});


// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});