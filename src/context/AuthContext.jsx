import { createContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const { setCartItems } = useContext(CartContext);
  const getStoredToken = () => {
    try {
      const stored = localStorage.getItem("token");
      return stored ? stored : null;
    } catch (err) {
      console.error("Invalid token in localStorage", err);
      return null;
    }
  };
  const [token, setToken] = useState(getStoredToken);
  console.log(token);
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // setCartItems([]);
    // localStorage.removeItem("cartItems");
    toast.success("You have been logged out successfully.");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
