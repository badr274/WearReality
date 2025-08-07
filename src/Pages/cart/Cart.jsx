import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import img from "../cart/img.jpg";
import { Link } from "react-router-dom";
import CartItemComponent from "../../components/cart/CartItemComponent";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="">
      {cartItems.length === 0 ? (
        <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column text-center">
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
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="container py-5">
          <h1 className="mb-5 text-center fw-bold fst-italic">Your Cart</h1>

          {cartItems.map((item, i) => (
            <CartItemComponent key={i} cartItem={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
