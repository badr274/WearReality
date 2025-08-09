import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getStoredToken = () => {
    try {
      return localStorage.getItem("token") || null;
    } catch (err) {
      console.error("Invalid token in localStorage", err);
      return null;
    }
  };

  const getStoredUserName = () => {
    try {
      return localStorage.getItem("userName") || null;
    } catch (err) {
      console.error("Invalid username in localStorage", err);
      return null;
    }
  };

  const [token, setToken] = useState(getStoredToken);
  const [userName, setUserName] = useState(getStoredUserName);

  const login = (newToken, name) => {
    setToken(newToken);
    setUserName(name);

    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    toast.success("You have been logged out successfully.");
  };

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    }
    if (!userName) {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) setUserName(storedUserName);
    }
  }, [token, userName]);

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
