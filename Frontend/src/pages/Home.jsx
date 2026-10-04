import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "./Products";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Hero />
      <Link
  to="/products"
  className="btn btn-dark mt-3"
>
  Explore Products
</Link>
    </>
  );
}

export default Home;