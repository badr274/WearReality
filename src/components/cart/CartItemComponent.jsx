import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import AOS from "aos";
import Swal from "sweetalert2";

export default function CartItemComponent({ cartItem }) {
  const { setCartItems } = useContext(CartContext);
  const handleIncreaseQuantity = (productId, stock) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product._id === productId) {
          if (item.quantity === stock) {
            Swal.fire({
              title: "Out of Stock",
              text: "You can't add more of this product.",
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: "#651214ff",
            });
            return item;
          } else {
            return { ...item, quantity: item.quantity + 1 };
          }
        }
        return item;
      })
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product?._id !== productId)
    );
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div
      className="row align-items-center border-bottom py-3 overflow-auto"
      data-aos="fade-right"
    >
      <div className="col-2">
        <img src={cartItem?.product?.imageCover} className="w-50" alt="item" />
      </div>
      <div className="col-3">
        <h6>{cartItem?.product?.title}</h6>
      </div>
      <div className="col-3">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary "
            onClick={() => handleDecreaseQuantity(cartItem?.product._id)}
          >
            -
          </button>
          <span className="mx-2">{cartItem?.quantity}</span>
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              handleIncreaseQuantity(
                cartItem?.product._id,
                cartItem.product.quantity
              )
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="col-2 fw-bold">
        {(cartItem?.product?.price * cartItem?.quantity).toFixed(2)}
      </div>
      <div className="col-2">
        <button
          className="btn btn-sm btn-link text-danger ps-0"
          onClick={() => handleRemoveFromCart(cartItem?.product?._id)}
        >
          <i className="bi bi-trash fs-4"></i>
        </button>
      </div>
    </div>
  );
}
