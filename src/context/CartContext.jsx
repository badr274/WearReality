import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
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

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        if (updatedCart[existingItemIndex].quantity === product.quantity) {
          Swal.fire({
            title: "Out of Stock",
            text: "You can't add more of this product.",
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
      return [
        ...prev,
        {
          quantity: 1,
          product: product,
        },
      ];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
