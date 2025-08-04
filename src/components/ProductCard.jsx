const ProductCard = ({ product, inProductPage = false }) => {
  return (
    <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div
        className="card h-100 shadow-sm"
        style={{
          boxShadow: "0 25px 50px rgba(74, 74, 74, 0.69)",
          border: "none",
        }}
      >
        <img
          src={product.imageCover || product.images?.[0]}
          className="card-img-top w-100"
          alt={product.title}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold ">{product.title}</h5>
          <p className="card-text text-muted small">
            {product.description.length < 80
              ? product.description
              : `${product.description.slice(0, 80)}...`}
          </p>
          <div className="mt-auto">
            <div className="mb-2">
              <span className="fw-bold text-success">
                EGP {product.priceAfterDiscount || product.price}
              </span>
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
              {product.ratingsAverage || "N/A"} ({product.ratingsQuantity || 0}{" "}
              reviews)
            </div>
          </div>
          {inProductPage ? <button>Add to cart</button> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
