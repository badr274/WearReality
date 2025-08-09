import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import CartProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import WishListProvider from "./context/WishListContext.jsx";
import "aos/dist/aos.css";
import AOS from "aos";
import ReviewsProvider from "./context/ReviewsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishListProvider>
          <ReviewsProvider>
            <Toaster position="top center" />
            <App />
          </ReviewsProvider>
        </WishListProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
