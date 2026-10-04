const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity, size } = req.body;

    let cartItem = await Cart.findOne({
      user: req.user.id,
      product,
      size,
    });

    if (cartItem) {
      cartItem.quantity += quantity;

      await cartItem.save();

      return res.json({
        message: "Cart Updated",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user: req.user.id,
      product,
      quantity,
      size,
    });

    res.status(201).json({
      message: "Added To Cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getCart = async (req, res) => {
  try {

    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.removeCartItem = async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};