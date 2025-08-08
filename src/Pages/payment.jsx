import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

const PaymentPage = () => {
  const { totalPrice } = useContext(CartContext);
  const [formData, setFormData] = useState({
    cardNumber: "",
    nameCard: "",
    expires: "",
    ccv: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required";
    if (!formData.nameCard) newErrors.nameCard = "Cardholder name is required";
    if (!formData.expires) newErrors.expires = "Expiration date is required";
    if (!formData.ccv) newErrors.ccv = "CCV is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    Swal.fire({
      title: `Are you sure you want to pay ${totalPrice.toFixed(2)} EGP?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place order",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Your order has been placed!", "", "success");
        navigate("/");
      }
    });
  };

  return (
    <div className="container py-5 bg-white position-relative">
      <div className="row align-items-center">
        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src="images/payment.png"
            alt="Credit Card"
            className="img-fluid rounded d-block d-lg-none"
            style={{ maxWidth: "350px" }}
          />
          <img
            src="images/payment.png"
            alt="Credit Card Large"
            className="img-fluid rounded d-none d-lg-block"
            style={{ maxWidth: "450px" }}
          />
        </div>

        <div className="col-md-6">
          <h5 className="fw-bold mb-3" style={{ color: "#651214" }}>
            Payment Method
          </h5>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="card"
              defaultChecked
            />
            <label
              className="form-check-label"
              htmlFor="card"
              style={{ color: "#252525ff" }}
            >
              Card
            </label>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="paypal"
            />
            <label
              className="form-check-label"
              htmlFor="paypal"
              style={{ color: "#252525ff" }}
            >
              PayPal
            </label>
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold" style={{ color: "#651214" }}>
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              className="form-control border-2"
              placeholder="1234 3618 3612 3456"
              style={{ borderColor: "#8b8b8b41" }}
              value={formData.cardNumber}
              onChange={handleChange}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(101, 18, 20, 0.25)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {errors.cardNumber && (
              <small className="text-danger">{errors.cardNumber}</small>
            )}
          </div>

          <div className="mb-2">
            <label className="form-label fw-bold" style={{ color: "#651214" }}>
              Name Card
            </label>
            <input
              type="text"
              name="nameCard"
              className="form-control border-2"
              placeholder="Wanda Maximoff"
              style={{ borderColor: "#8b8b8b41" }}
              value={formData.nameCard}
              onChange={handleChange}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 0.2rem rgba(101, 18, 20, 0.25)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            {errors.nameCard && (
              <small className="text-danger">{errors.nameCard}</small>
            )}
          </div>

          <div className="row g-3 mb-2">
            <div className="col-6">
              <label
                className="form-label fw-bold"
                style={{ color: "#651214" }}
              >
                Expires
              </label>
              <input
                type="text"
                name="expires"
                className="form-control border-2"
                placeholder="MM / YY"
                style={{ borderColor: "#8b8b8b41" }}
                value={formData.expires}
                onChange={handleChange}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 0.2rem rgba(101, 18, 20, 0.25)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              {errors.expires && (
                <small className="text-danger">{errors.expires}</small>
              )}
            </div>

            <div className="col-6">
              <label
                className="form-label fw-bold"
                style={{ color: "#651214" }}
              >
                CCV
              </label>
              <input
                type="text"
                name="ccv"
                className="form-control border-2"
                placeholder="123"
                style={{ borderColor: "#8b8b8b41" }}
                value={formData.ccv}
                onChange={handleChange}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 0 0.2rem rgba(101, 18, 20, 0.25)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
              {errors.ccv && (
                <small className="text-danger">{errors.ccv}</small>
              )}
            </div>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="saveCard" />
            <label
              className="form-check-label"
              htmlFor="saveCard"
              style={{ color: "#252525ff" }}
            >
              Save card for faster checkout
            </label>
          </div>

          <button
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: "#611522",
              color: "#e3e3e3ff",
              borderRadius: "25px",
            }}
            onClick={handleSubmit}
          >
            Place Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
