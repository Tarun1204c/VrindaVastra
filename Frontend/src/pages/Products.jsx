import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container my-5">

      <h2 className="text-center mb-4">
        Our Products
      </h2>

      <div className="row">

       {products?.length > 0 ? (
  products.map((product) => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))
) : (
  <div className="text-center">
    <h4>No Products Found</h4>
  </div>
)} 

      </div>

    </div>
  );
}

export default Products;