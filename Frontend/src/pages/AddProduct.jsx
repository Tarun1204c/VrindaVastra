import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "VrindaVastra",
    material: "100% Cotton",
    stock: "",
    colors: "",
    sizes: [],
  });

  const [images, setImages] = useState([]);

  const categories = [
    "Men",
    "Women",
    "Kids",
    "Home Textile",
  ];

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (size) => {
    setProduct((prev) => {
      if (prev.sizes.includes(size)) {
        return {
          ...prev,
          sizes: prev.sizes.filter((s) => s !== size),
        };
      }

      return {
        ...prev,
        sizes: [...prev.sizes, size],
      };
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name.trim());
      formData.append("description", product.description.trim());
      formData.append("price", Number(product.price));
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("material", product.material);
      formData.append("stock", Number(product.stock));

      const colorsArray = product.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean);

      formData.append("colors", JSON.stringify(colorsArray));
      formData.append("sizes", JSON.stringify(product.sizes));

      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }

      await api.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");

      navigate("/products");
    } catch (error) {
      console.error("Add Product Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px" }}>
          <h2 className="mb-4 text-center">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">
                Product Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price + Stock */}
            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">
                Category
              </label>

              <select
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand + Material */}
            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Brand
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Material
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="material"
                  value={product.material}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Colors */}
            <div className="mb-3">
              <label className="form-label">
                Colors
              </label>

              <input
                type="text"
                className="form-control"
                name="colors"
                value={product.colors}
                onChange={handleChange}
                placeholder="Red, Blue, Black"
              />

              <small className="text-muted">
                Separate multiple colors with commas.
              </small>
            </div>

            {/* Sizes */}
            <div className="mb-3">
              <label className="form-label d-block">
                Available Sizes
              </label>

              {sizeOptions.map((size) => (
                <div
                  className="form-check form-check-inline"
                  key={size}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`size-${size}`}
                    checked={product.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />

                  <label
                    className="form-check-label"
                    htmlFor={`size-${size}`}
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>

            {/* Images */}
            <div className="mb-4">
              <label className="form-label">
                Product Images
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-dark w-100"
            >
              Add Product
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
                