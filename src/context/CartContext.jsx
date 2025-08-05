import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({});

const CartProvider = ({ children }) => {
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
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }

      return [
        ...prev,
        {
          itemId: crypto.randomUUID(),
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
