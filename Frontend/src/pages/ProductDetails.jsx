import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const BASE_URL =
  "https://e-commerce-website-vrindavastra-2.onrender.com";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  // =========================
  // Add To Cart
  // =========================
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await api.post(
        "/cart",
        {
          product: product._id,
          quantity,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added To Cart");
    } catch (error) {
      console.log("Cart Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // Add To Wishlist
  // =========================
  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await api.post(
        "/wishlist",
        {
          product: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Wishlist");
    } catch (error) {
      console.log("Wishlist Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // Loading
  // =========================
  if (!product) {
    return (
      <>
        <Navbar />

        <div className="container mt-5 text-center">
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  // =========================
  // Product Image
  // =========================
  const imageUrl =
    product.image &&
    Array.isArray(product.image) &&
    product.image.length > 0
      ? `${BASE_URL}/uploads/${encodeURIComponent(
          product.image[0]
        )}`
      : "https://via.placeholder.com/500x600?text=No+Image";

  return (
    <>
      <div className="container my-5">
        <div className="row">

          {/* =========================
              Product Image
          ========================= */}
          <div className="col-md-6 text-center mb-4">
            <img
              src={imageUrl}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://via.placeholder.com/500x600?text=No+Image";
              }}
            />
          </div>

          {/* =========================
              Product Details
          ========================= */}
          <div className="col-md-6">

            <h2 className="fw-bold">
              {product.name}
            </h2>

            <h3 className="text-success mb-3">
              ₹{product.price}
            </h3>

            <p>
              {product.description}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>Material:</strong>{" "}
              {product.material}
            </p>

            {/* =========================
                Select Size
            ========================= */}
            <div className="mt-4">
              <h5>Select Size</h5>

              <div className="d-flex gap-2 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={`btn ${
                        size === item
                          ? "btn-dark"
                          : "btn-outline-dark"
                      }`}
                      onClick={() =>
                        setSize(item)
                      }
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* =========================
                Quantity
            ========================= */}
            <div className="mt-4">
              <h5>Quantity</h5>

              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                >
                  -
                </button>

                <span className="mx-4 fs-4">
                  {quantity}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* =========================
                Buttons
            ========================= */}
            <div className="mt-5 d-flex gap-2 flex-wrap">

              <button
                type="button"
                className="btn btn-dark btn-lg"
                onClick={addToCart}
              >
                🛒 Add To Cart
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-lg"
                onClick={addToWishlist}
              >
                ❤️ Wishlist
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;