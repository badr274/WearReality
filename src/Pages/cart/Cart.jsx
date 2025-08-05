import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import img from '../cart/img.jpg';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity } = useContext(CartContext);

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
          
          <Link to="/Products" className="btn btn-success text-white" style={{ backgroundColor: "#651214", borderColor: "#651214" }}>
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="container py-5">
          <h2 className="mb-4 text-dark">Your Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid"
                    alt={item.name}
                   
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: {item.price} EGP</p>

                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="card-text fw-bold">
                      Total: {item.price * item.quantity} EGP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;