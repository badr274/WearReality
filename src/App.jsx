import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Products from "./Pages/products/Products";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import About from "./Pages/About/About";
import PersistLogin from "./components/routes/PersistLogin";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import Contact from "./Pages/contact/Contact";
import Cart from "./Pages/cart/Cart";
import ProductDetails from "./Pages/products/ProductDetails";
import WishList from "./Pages/wishlist/WishList";
import Layout from "./components/dashboard/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import Analytics from "./Pages/Admin/Analytics";
import Customer from "./Pages/Admin/Customer";
import PaymentPage from "./Pages/payment";
import ProtectedDashboard from "./components/routes/ProtectedDashboard";
import PageNotFound from "./Pages/pageNotFound/PageNotFound";
import Reviews from "./Pages/Admin/Reviews";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      {!isDashboardRoute && <MyNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
        <Route element={<ProtectedDashboard />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customer" element={<Customer />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isDashboardRoute && <MyFooter />}
    </>
  );
}

export default App;
