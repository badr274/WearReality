import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Card";

export default function LatestProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products?limit=20&page=1")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
}
