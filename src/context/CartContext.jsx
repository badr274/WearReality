import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { StockContext } from "./StockContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { stockData, setStockData } = useContext(StockContext);
  const navigate = useNavigate();

  const getStoredCart = () => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Invalid cartItems in localStorage", err);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getStoredCart);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    if (!token) {
      setCartItems([]);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to add this product to your cart.",
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

    const stockItem = stockData.find((item) => item.productId === product.id);
    if (!stockItem || stockItem.stock <= 0) {
      Swal.fire({
        title: "Out of Stock",
        text: "This product is out of stock.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#651214ff",
      });
      return;
    }

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        if (updatedCart[existingItemIndex].quantity >= 50) {
          Swal.fire({
            title: "Out of Stock",
            text: `You already have ${updatedCart[existingItemIndex].quantity} units of this product in your cart. You can't add more than 50.`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#651214ff",
          });
          return prev;
        }
        updatedCart[existingItemIndex].quantity += 1;
        toast.success("Product quantity updated in cart!");
        return updatedCart;
      }

      toast.success("Product added to cart successfully!");
      return [...prev, { quantity: 1, product }];
    });

    setStockData((prevStock) =>
      prevStock.map((item) =>
        item.productId === product.id
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );
  };

  const isOutOfStock = (productId) => {
    const item = cartItems.find((i) => i.product._id === productId);
    return item && item.quantity >= 50;
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, isOutOfStock, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
