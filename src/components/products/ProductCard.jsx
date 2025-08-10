import { useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/WishListContext";
import { StockContext } from "../../context/StockContext";

const ProductCard = ({ product, showButtons = false, isWishlist = false }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToCart, isOutOfStock } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist } = useContext(WishListContext);
  const { stockData } = useContext(StockContext);

  const outOfStock = isOutOfStock(product._id);
  const stockInfo = stockData.find((item) => item.productId === product.id);
  const inStock = stockInfo ? stockInfo.stock > 0 : false;

  const handleAddToWishlist = () => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to add this product to your wishlist.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#651214ff",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (outOfStock) {
      Swal.fire({
        title: "Out of Stock",
        text: "This product is out of stock.",
        icon: "error",
        confirmButtonColor: "#651214ff",
      });
      return;
    }
    addToCart(product);
  };

  return (
    <div
      className="card h-100 shadow-sm position-relative"
      style={{
        boxShadow: "0 25px 50px rgba(74, 74, 74, 0.69)",
        border: "none",
      }}
      data-aos="fade-up"
    >
      {outOfStock && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "-30px",
            backgroundColor: "#651214ff",
            color: "white",
            padding: "5px 40px",
            transform: "rotate(-45deg)",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          Out of Stock
        </div>
      )}

      <img
        src={product.imageCover || product.images?.[0]}
        className="card-img-top w-100"
        alt={product.title}
        style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => navigate(`/products/${product._id}`)}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title fw-bold">{product.title}</h5>
          <span
            className={`badge ${
              inStock ? "bg-success" : "bg-danger"
            } text-white`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="card-text text-muted small">
          {product.description.length < 80
            ? product.description
            : `${product.description.slice(0, 80)}...`}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <div className="mb-1">
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
              <div className="d-flex align-items-center">
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
          </div>
          <div className="small text-warning ms-2">
            {product.ratingsAverage || "N/A"} ({product.ratingsQuantity || 0}{" "}
            reviews)
          </div>
        </div>

        {showButtons && (
          <div className="d-flex flex-wrap gap-2 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              style={{
                backgroundColor: outOfStock ? "gray" : "#651214",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: outOfStock ? "not-allowed" : "pointer",
                borderRadius: "5px",
              }}
            >
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              className="btn flex-grow-1"
              style={{ backgroundColor: "rgb(89, 92, 95)", color: "white" }}
              onClick={
                isWishlist
                  ? () => removeFromWishlist(product._id)
                  : handleAddToWishlist
              }
            >
              {isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
