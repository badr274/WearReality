import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard";
import ProductSkeleton from "./ProductSkeleton";

export default function LatestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products?limit=20&page=1")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-normal mb-3 fs-4 fs-md-3 fs-lg-2 mb-3">
        Latest Products
      </h2>
      <div className="row">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                <ProductSkeleton showContent={true} />
              </div>
            ))
          : products.map((product, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                <ProductCard product={product} showButtons={false} />
              </div>
            ))}
      </div>
    </div>
  );
}
