import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/home/ProductSkeleton";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchProducts = (category = "") => {
    setLoading(true);
    let url = "https://ecommerce.routemisr.com/api/v1/products";
    axios
      .get(url)
      .then((response) => {
        const allProducts = response.data.data;
        const uniqueCategories = [
          ...new Set(allProducts.map((p) => p.category.name)),
        ];
        setCategories(uniqueCategories);

        if (category && category !== "all") {
          const filtered = allProducts.filter(
            (p) => p.category.name === category
          );
          setProducts(filtered);
        } else {
          setProducts(allProducts);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <ul
            className="shadow-sm p-3"
            style={{ borderRadius: "5px", backgroundColor: "white" }}
          >
            <li className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="fs-4 m-0" style={{ color: "#651214ff" }}>
                Filter
              </h2>
              <i
                className="bi bi-filter fs-5"
                style={{ color: "#651214ff" }}
              ></i>
            </li>
            <li
              className={`list-group-item ${
                selectedCategory === "all" ? "fw-bold" : ""
              }`}
              onClick={() => handleCategoryClick("all")}
              style={{
                cursor: "pointer",
                color: "#651214ff",
                paddingBlock: "10px",
              }}
            >
              All Categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`list-group-item ${
                  selectedCategory === category ? "fw-bold" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
                style={{
                  cursor: "pointer",
                  color: "#651214ff",
                  paddingBlock: "8px",
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12 d-md-none mb-3">
          <div className="dropdown">
            <button
              className="btn w-100 d-flex justify-content-between align-items-center"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "#651214ff", color: "white" }}
            >
              Filter
              <i className="bi bi-list fs-5"></i>
            </button>
            <ul
              className="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <span
                  className={`dropdown-item ${
                    selectedCategory === "all" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleCategoryClick("all")}
                  style={{ cursor: "pointer" }}
                >
                  All Categories
                </span>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <span
                    className={`dropdown-item ${
                      selectedCategory === category ? "fw-bold" : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                    style={{ cursor: "pointer" }}
                  >
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <h2
            style={{ color: "#651214ff" }}
            className="fw-bold mb-4 fst-italic"
          >
            {selectedCategory === "all" ? "All Products" : selectedCategory}
          </h2>
          <div className="row">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="col-12 col-sm-6 col-lg-4 mb-4">
                    <ProductSkeleton showContent={true} showBtns={true} />
                  </div>
                ))
              : products.map((product) => (
                  <div
                    key={product._id}
                    className="col-12 col-sm-6 col-lg-4 mb-4"
                  >
                    <ProductCard product={product} showButtons={true} />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
