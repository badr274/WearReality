import { createContext, useEffect, useState } from "react";
import WishList from "./../Pages/wishlist/WishList";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const WishListContext = createContext();

const WishListProvider = ({ children }) => {
  const getStoredWishlist = () => {
    try {
      const stored = localStorage.getItem("wishlistItems");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Invalid wishlistItems in localStorage", err);
      return [];
    }
  };
  const [wishlistItems, setWishlistItems] = useState(getStoredWishlist);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.error("Product already in wishlist!");
        return prev;
      } else {
        toast.success("Product added to wishlist successfully!");
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishListContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
export default WishListProvider;
