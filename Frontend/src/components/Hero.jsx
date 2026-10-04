import { Link } from "react-router-dom";
import logo from "../assets/image/vrindavastra logo.jpeg";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">

            <span className="text-uppercase fw-bold text-success">
              Premium Cotton Collection
            </span>

            <h1 className="display-4 fw-bold mt-3">
              Discover Pure Cotton Fashion
            </h1>

            <p className="mt-3 text-muted fs-5">
              Experience elegance with our premium cotton kurtis,
              shirts, sarees and home textiles crafted for
              comfort and style.
            </p>

            <div className="mt-4">

              <Link
                to="/products"
                className="btn btn-dark btn-lg me-3"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="btn btn-outline-dark btn-lg"
              >
                Learn More
              </Link>

            </div>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src={logo}
              className="img-fluid hero-logo"
              alt="VrindaVastra"
            />

          </div>

        </div>
      </div>
    </section>
  );
}