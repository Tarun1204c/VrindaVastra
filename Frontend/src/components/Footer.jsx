import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold text-warning">
              VrindaVastra
            </h3>

            <p className="text-light">
              Discover the latest fashion trends with premium quality clothing
              at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/products">
                  Products
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/cart">
                  Cart
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/wishlist">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Customer Support</h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <Link
                  className="text-decoration-none text-light"
                  to="/help-center"
                >
                  Help Center
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="text-decoration-none text-light"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="text-decoration-none text-light"
                  to="/terms-conditions"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="text-decoration-none text-light"
                  to="/return-policy"
                >
                  Return Policy
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Contact</h5>

            <p className="mb-2">
              📧 support@vrindavastra.com
            </p>

            <p className="mb-2">
              📞 +91 9068619911
            </p>

            <p>
              📍 Mathura, India
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          © {new Date().getFullYear()}{" "}
          <strong>VrindaVastra</strong>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}