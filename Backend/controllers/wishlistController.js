const Wishlist = require("../models/Wishlist");

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product,
    });

    if (exists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      product,
    });

    res.status(201).json({
      message: "Added to Wishlist",
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Wishlist
exports.getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json(wishlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Wishlist Item
exports.removeWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      message: "Removed from Wishlist",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};