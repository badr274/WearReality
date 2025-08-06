import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import img from '../cart/img.jpg';
import { Link } from 'react-router-dom';
import CartItemComponent from '../../components/cart/CartItemComponent';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  // ✅ حساب Total بشكل صحيح
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <div className="container py-5">
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
        <>
          <h2 className="mb-4 text-white">Your Cart</h2>

          <div className="row">
            
            <div className="col-md-9">
              {cartItems.map((item, index) => (
                <CartItemComponent key={index} cartItem={item} />
              ))}
            </div>

            
            <div className="col-md-3">
              <div
                className="card p-4 shadow-sm"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <h5 style={{ color: "#651214ff"}} className="mb-3 fw-bold">Summary</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span style={{color:"rgba(60, 62, 65, 1)"}} className='fw-bold'>Total:</span>
                  <strong className="text-success">
                    {totalPrice.toFixed(2)} EGP
                  </strong>
                </div>

                <div className="mt-4 d-grid gap-2">
                  <button style={{backgroundColor:"rgb(101, 18, 20)",color:"#efefefff" ,borderRadius:"25px"}} className="btn ">Checkout</button>
                  <button style={{backgroundColor:"rgb(89, 92, 95)" ,color:"#efefefff",borderRadius:"25px" }} className="btn " onClick={clearCart}>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
