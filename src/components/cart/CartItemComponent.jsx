import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { StockContext } from "../../context/StockContext";
import AOS from "aos";
import Swal from "sweetalert2";

export default function CartItemComponent({ cartItem }) {
  const { setCartItems } = useContext(CartContext);
  const { stockData, setStockData } = useContext(StockContext);

  const productStock =
    stockData.find((item) => item.productId === cartItem.product.id)?.stock ||
    0;

  const handleIncreaseQuantity = (productId) => {
    if (productStock === 0) {
      Swal.fire({
        title: "Out of Stock",
        text: "You can't add more of this product.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#651214ff",
      });
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    setStockData((prevStock) =>
      prevStock.map((s) =>
        s.productId === productId ? { ...s, stock: s.stock - 1 } : s
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product._id === productId && item.quantity > 1) {
          setStockData((prevStock) =>
            prevStock.map((s) =>
              s.productId === productId ? { ...s, stock: s.stock + 1 } : s
            )
          );
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId) => {
    const removedItem = cartItem;
    setStockData((prevStock) =>
      prevStock.map((s) =>
        s.productId === productId
          ? { ...s, stock: s.stock + removedItem.quantity }
          : s
      )
    );
    setCartItems((prev) =>
      prev.filter((item) => item.product?._id !== productId)
    );
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const getStockBadgeClass = (stock) => {
    if (stock === 0) return "badge bg-danger";
    if (stock < 10) return "badge bg-warning text-dark";
    return "badge bg-success";
  };

  return (
    <div
      className="row align-items-center justify-content-between border rounded-3 shadow-sm p-3 mb-3 text-center text-md-start"
      style={{ minWidth: "720px", backgroundColor: "#fff" }}
      data-aos="fade-up"
    >
      <div className="col-auto">
        <img
          src={cartItem?.product?.imageCover}
          alt="item"
          className="rounded"
          style={{ width: "70px", height: "70px", objectFit: "cover" }}
        />
      </div>
      <div
        className="col"
        style={{
          maxWidth: "180px",
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <h6 className="m-0 fw-semibold">{cartItem?.product?.title}</h6>
      </div>
      <div className="col-auto">
        <span className={getStockBadgeClass(productStock)}>
          {productStock > 0 ? `${productStock} in stock` : "Out of stock"}
        </span>
      </div>
      <div className="col-auto d-flex align-items-center bg-light rounded-pill px-2 py-1">
        <button
          className="btn btn-outline-secondary btn-sm rounded-circle"
          onClick={() => handleDecreaseQuantity(cartItem?.product._id)}
        >
          -
        </button>
        <span className="mx-3 fw-bold">{cartItem?.quantity}</span>
        <button
          className="btn btn-outline-secondary btn-sm rounded-circle"
          onClick={() => handleIncreaseQuantity(cartItem?.product._id)}
          disabled={productStock === 0}
        >
          +
        </button>
      </div>
      <div className="col-auto fw-bold fs-6 text-success">
        ${(cartItem?.product?.price * cartItem?.quantity).toFixed(2)}
      </div>
      <div className="col-auto">
        <button
          className="btn btn-sm btn-outline-danger rounded-circle"
          onClick={() => handleRemoveFromCart(cartItem?.product?._id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
