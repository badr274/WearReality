import { useContext } from "react";
import { WishListContext } from "../../context/WishListContext";
import img from "./WhatsApp Image 2025-08-06 at 12.22.05_e05e9fa7.jpg";
import { Link } from "react-router";
import ProductCard from "../../components/products/ProductCard";

const WishList = () => {
  const { wishlistItems } = useContext(WishListContext);

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="min-vh-100 gap-5 d-flex justify-content-center align-items-center flex-column text-center">
          <img
            src={img}
            alt="Empty Cart"
            className="my-4"
            style={{ width: "400px" }}
          />

          <Link
            to="/Products"
            className="btn btn-success text-white"
            style={{ backgroundColor: "#651214", borderColor: "#651214" }}
          >
            Add Items To Wishlist
          </Link>
        </div>
      ) : (
        <div className="container py-5">
          <h1 className="mb-5 text-center fw-bold fst-italic">Your Wishlist</h1>
          <div className="row">
            {wishlistItems.map((item, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-4 mb-4">
                <ProductCard
                  product={item}
                  showButtons={true}
                  isWishlist={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
