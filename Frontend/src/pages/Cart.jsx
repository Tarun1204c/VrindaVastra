import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

// Production Backend URL
const BASE_URL =
  "https://e-commerce-website-vrindavastra-2.onrender.com";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Cart
  // =========================
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart([]);
        setLoading(false);
        return;
      }

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Only keep cart items with valid products
      const validCart = Array.isArray(res.data)
        ? res.data.filter((item) => item?.product)
        : [];

      setCart(validCart);
    } catch (error) {
      console.error(
        "Fetch Cart Error:",
        error.response?.data || error.message
      );

      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Increase Quantity
  // =========================
  const increaseQuantity = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await api.post(
        "/cart",
        {
          product: item.product._id,
          quantity: 1,
          size: item.size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh cart
      await fetchCart();
    } catch (error) {
      console.error(
        "Increase Quantity Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to increase quantity"
      );
    }
  };

  // =========================
  // Remove Cart Item
  // =========================
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh cart
      await fetchCart();
    } catch (error) {
      console.error(
        "Remove Cart Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to remove item"
      );
    }
  };

  // =========================
  // Calculate Total Price
  // =========================
  const totalPrice = cart.reduce((total, item) => {
    if (!item?.product) {
      return total;
    }

    const price = Number(item.product.price) || 0;
    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;
  }, 0);

  // =========================
  // Loading State
  // =========================
  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container mt-5 text-center">
          <h2>Loading Cart...</h2>
        </div>
      </>
    );
  }

  // =========================
  // Render Cart
  // =========================
  return (
    <>

      <div className="container my-5">

        <h2 className="fw-bold mb-4">
          🛒 Shopping Cart
        </h2>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="text-center py-5">

            <div className="alert alert-warning">
              Your cart is empty.
            </div>

            <Link
              to="/products"
              className="btn btn-dark"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <div className="row">

            {/* =========================
                Cart Items
            ========================= */}
            <div className="col-lg-8">

              {cart.map((item) => {

                // Product Image
                const imageUrl =
                  item?.product?.image &&
                  Array.isArray(item.product.image) &&
                  item.product.image.length > 0
                    ? `${BASE_URL}/uploads/${encodeURIComponent(
                        item.product.image[0]
                      )}`
                    : "https://via.placeholder.com/300x300?text=No+Image";

                return (
                  <div
                    className="card mb-3 shadow-sm border-0"
                    key={item._id}
                  >

                    <div className="row g-0">

                      {/* Product Image */}
                      <div className="col-md-3">

                        <img
                          src={imageUrl}
                          alt={
                            item.product?.name ||
                            "Product"
                          }
                          className="img-fluid rounded-start"
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;

                            e.currentTarget.src =
                              "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />

                      </div>

                      {/* Product Details */}
                      <div className="col-md-9">

                        <div className="card-body">

                          <h4 className="fw-bold">
                            {item.product?.name}
                          </h4>

                          <h5 className="text-success">
                            ₹{item.product?.price}
                          </h5>

                          <p className="mb-2">
                            <strong>
                              Size:
                            </strong>{" "}
                            {item.size || "N/A"}
                          </p>

                          <p className="mb-3">
                            <strong>
                              Quantity:
                            </strong>{" "}
                            {item.quantity}
                          </p>

                          {/* Buttons */}
                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() =>
                                increaseQuantity(item)
                              }
                            >
                              +
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() =>
                                removeItem(item._id)
                              }
                            >
                              Remove
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* =========================
                Order Summary
            ========================= */}
            <div className="col-lg-4">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h3 className="fw-bold">
                    Order Summary
                  </h3>

                  <hr />

                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      Items
                    </span>

                    <span>
                      {cart.length}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between">

                    <h4>
                      Total
                    </h4>

                    <h4 className="text-success">
                      ₹{totalPrice}
                    </h4>

                  </div>

                  <Link
                    to="/checkout"
                    className="btn btn-success w-100 mt-3"
                  >
                    Proceed To Checkout
                  </Link>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}