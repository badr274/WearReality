import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React from "react";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Products from "./Pages/Products";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import About from "./Pages/About/About";
import PersistLogin from "./components/routes/PersistLogin";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import Contact from "./Pages/contact/Contact";
import Cart from "./Pages/cart/Cart";

// Dashboard Layout & Pages
import Layout from "./components/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import Analytics from "./Pages/Admin/Analytics";
import Customer from "./Pages/Admin/Customer";
import PaymentPage from "./components/payment";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <MyNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="customer" element={<Customer />} />
        </Route>
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes Nested under Layout */}
        </Route>

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!isDashboardRoute && <MyFooter />}
    </>
  );
}

export default App;
