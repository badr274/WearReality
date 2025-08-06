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
      return [...prev, product];
    });
    toast.success("Product added to wishlist successfully!");
  };

  return (
    <WishListContext.Provider
      value={{ wishlistItems, setWishlistItems, addToWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
};
export default WishListProvider;
