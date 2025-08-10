import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import img from "/images/img.jpg";
import { Link } from "react-router-dom";
import CartItemComponent from "./../../components/cart/CartItemComponent";
import TotalCartComponent from "./../../components/cart/TotalCartComponent";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container my-5">
      {cartItems.length === 0 ? (
        <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column text-center">
          <img
            src={img}
            alt="Empty Cart"
            className="my-4 img-fluid"
            style={{ maxWidth: "400px" }}
          />
          <Link
            to="/Products"
            className="btn btn-success text-white"
            style={{ backgroundColor: "#651214", borderColor: "#651214" }}
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          <h2
            className=" text-center fw-bold fst-italic"
            style={{ color: "var(--main-color)", marginBottom: "70px" }}
          >
            Your Cart
          </h2>
          <div className="row g-4">
            <div className="col-lg-9 col-12">
              <div
                className="d-block d-lg-none"
                style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  whiteSpace: "nowrap",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ minWidth: "720px" }}>
                  {cartItems.map((item, i) => (
                    <CartItemComponent key={i} cartItem={item} />
                  ))}
                </div>
              </div>

              <div className="d-none d-lg-block">
                <div className="fw-bold border-bottom pb-2 mb-3 text-center row">
                  <div className="col-2">Image</div>
                  <div className="col-3">Title</div>
                  <div className="col-2">Stock</div>
                  <div className="col-3">Quantity</div>
                  <div className="col-2">Price</div>
                </div>
                {cartItems.map((item, i) => (
                  <CartItemComponent key={i} cartItem={item} />
                ))}
              </div>
            </div>

            <div className="col-lg-3 col-12">
              <div className="sticky-top" style={{ top: "100px" }}>
                <TotalCartComponent />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
