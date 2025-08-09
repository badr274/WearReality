import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { WishListContext } from "../context/WishListContext";
import Aos from "aos";
const ProductCard = ({ product, showButtons = false, isWishlist = false }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist } = useContext(WishListContext);
  const handleAddToWishlist = (product) => {
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

  console.log("ProductCard", product);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="card h-100 shadow-sm"
      style={{
        boxShadow: "0 25px 50px rgba(74, 74, 74, 0.69)",
        border: "none",
      }}
      data-aos="fade-up"
    >
      <img
        src={product.imageCover || product.images?.[0]}
        className="card-img-top w-100"
        alt={product.title}
        style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold ">{product.title}</h5>
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
              className="btn flex-grow-1"
              style={{ backgroundColor: "#651214ff", color: "white" }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="btn flex-grow-1"
              style={{ backgroundColor: "rgb(89, 92, 95)", color: "white" }}
              onClick={
                isWishlist
                  ? () => removeFromWishlist(product._id)
                  : () => handleAddToWishlist(product)
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
