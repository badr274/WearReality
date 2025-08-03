import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCards() {
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
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm" style={{ boxShadow: "0 25px 50px rgba(74, 74, 74, 0.69)" , border:"none"}}>
              <img
                src={product.imageCover || product.images?.[0]}
                className="card-img-top w-100"
                alt={product.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold ">{product.title}</h5>
                <p className="card-text text-muted small">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <div className="mb-2">
                    <span className="fw-bold text-success">EGP {product.priceAfterDiscount || product.price}</span>
                    {product.priceAfterDiscount && (
                      <span className="text-muted text-decoration-line-through ms-2">
                        EGP {product.price}
                      </span>
                    )}
                  </div>
                  {product.brand && (
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={product.brand.image}
                        alt={product.brand.name}
                        width="24"
                        height="24"
                        className="rounded-circle me-2"
                      />
                      <span className="small">{product.brand.name}</span>
                    </div>
                  )}
                  <div className="small text-warning">
                   {product.ratingsAverage || "N/A"} ({product.ratingsQuantity || 0} reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}