import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  return (
    <div className="container py-5 bg-white">
      <div className="row align-items-center">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src="images/payment.png"
            alt="Credit Card"
            className="img-fluid  rounded d-block d-lg-none"
            style={{ maxWidth: "350px" }}
          />
          <img
            src="images/payment.png"
            alt="Credit Card Large"
            className="img-fluid  rounded d-none d-lg-block"
            style={{ maxWidth: "450px" }}
          />
        </div>
        <div className="col-md-6">
          <h5 className="fw-bold mb-3" style={{ color: "#651214" }}>Payment Method</h5>

          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="paymentMethod" id="card" defaultChecked />
            <label className="form-check-label" htmlFor="card" style={{ color: "#4d4d4d" }}>Card</label>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" />
            <label className="form-check-label" htmlFor="paypal" style={{ color: "#4d4d4d" }}>PayPal</label>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#651214" }}>CARD NUMBER</label>
            <input
              type="text"
              className="form-control border-2"
              placeholder="1234 3618 3612 3456"
              style={{ borderColor: "#651214" }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 0 0.2rem rgba(101, 18, 20, 0.25)"}
              onBlur={(e) => e.target.style.boxShadow = "none"}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#651214" }}>NAME ON CARD</label>
            <input
              type="text"
              className="form-control border-2"
              placeholder="Wanda Maximoff"
              style={{ borderColor: "#651214" }}
              onFocus={(e) => e.target.style.boxShadow = "0 0 0 0.2rem rgba(101, 18, 20, 0.25)"}
              onBlur={(e) => e.target.style.boxShadow = "none"}
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6">
              <label className="form-label fw-bold" style={{ color: "#651214" }}>EXPIRES</label>
              <input
                type="text"
                className="form-control border-2"
                placeholder="MM / YY"
                style={{ borderColor: "#651214" }}
                onFocus={(e) => e.target.style.boxShadow = "0 0 0 0.2rem rgba(101, 18, 20, 0.25)"}
                onBlur={(e) => e.target.style.boxShadow = "none"}
              />
            </div>
            <div className="col-6">
              <label className="form-label fw-bold" style={{ color: "#651214" }}>CCV</label>
              <input
                type="text"
                className="form-control border-2"
                placeholder="123"
                style={{ borderColor: "#651214" }}
                onFocus={(e) => e.target.style.boxShadow = "0 0 0 0.2rem rgba(101, 18, 20, 0.25)"}
                onBlur={(e) => e.target.style.boxShadow = "none"}
              />
            </div>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="saveCard" />
            <label className="form-check-label" htmlFor="saveCard" style={{ color: "#4d4d4d" }}>
              Save card for faster checkout
            </label>
          </div>

          <button className="btn w-100 fw-bold" style={{ backgroundColor: "#651214", color: "#fff" }}>
            PLACE YOUR ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
