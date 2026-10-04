import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import logo from "../assets/image/vrindavastra logo.jpeg"; // Change if your logo name is different

export default function Navbar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { cartCount, wishlistCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
    } else {
      navigate("/products");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
    window.location.reload(); // Reload the page to update the navbar
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">

        {/* Logo */}

        <Link className="navbar-brand fw-bold" to="/">
          <img
            src={logo}
            alt="VrindaVastra"
            width="70"
            className="me-2"
          />
          VrindaVastra
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          {/* Search */}

          <form
            className="d-flex mx-auto"
            onSubmit={handleSearch}
            style={{ width: "40%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button className="btn btn-warning ms-2">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            {/* Wishlist */}

            <li className="nav-item position-relative mx-3">
              <Link
                className="nav-link"
                to="/wishlist"
              >
                <i className="bi bi-heart-fill fs-5"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {wishlistCount}
                </span>
              </Link>
            </li>

            {/* Cart */}

            <li className="nav-item position-relative mx-3">
              <Link
                className="nav-link"
                to="/cart"
              >
                <i className="bi bi-cart-fill fs-5"></i>

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                >
                  {cartCount}
                </span>
              </Link>
            </li>

            {/* Account */}

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-fill me-1"></i>

                Account
              </a>

              <ul className="dropdown-menu dropdown-menu-end">

                <li>
                  <Link
                    className="dropdown-item"
                    to="/profile"
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/orders"
                  >
                    My Orders
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

              </ul>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}