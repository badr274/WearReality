import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MyNavbar = () => {
  const { token, logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = [
    { name: "Home", id: "home", href: "/" },
    { name: "Cart", id: "cart", href: "/cart" },
    { name: "Products", id: "products", href: "/products" },
    { name: "About", id: "About", href: "/about" },
    { name: "Contact", id: "Contact", href: "/contact" },
    { name: "Wishlist", id: "Wishlist", href: "/wishlist" },
    ...(token && role === "admin"
      ? [{ name: "Dashboard", id: "dashboard", href: "/dashboard" }]
      : []),
  ];

  const linkStyle = (id) => ({
    color: activeLink === id ? "#651214" : "#4d4d4d",
    textDecoration: "none",
    fontWeight: activeLink === id ? "600" : "normal",
    transition: "color 0.3s",
  });

  return (
    <nav
      className="navbar  navbar-expand-lg border-bottom py-2 shadow-sm"
      style={{ backgroundColor: "#f6f2f2ff" }}
    >
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <i
            className="bi bi-cart-fill fs-4 me-2"
            style={{ color: "#651214" }}
          ></i>
          <span className="fw-bold " style={{ color: "#651214" }}>
            Wear Reality
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 flex-lg-row gap-lg-3 me-lg-auto ms-lg-auto">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <Link
                  to={link.href}
                  style={linkStyle(link.id)}
                  onClick={() => setActiveLink(link.id)}
                  onMouseEnter={(e) => {
                    if (activeLink !== link.id)
                      e.target.style.color = "#651214";
                  }}
                  onMouseLeave={(e) => {
                    if (activeLink !== link.id)
                      e.target.style.color = "#4d4d4d";
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-3 mt-3 mt-lg-0  flex-column flex-lg-row">
            <ul className="d-flex list-unstyled mb-0 gap-3">
              {["instagram", "pinterest", "twitter"].map((platform) => (
                <li key={platform}>
                  <a
                    href="#"
                    style={{
                      color: "#4d4d4d",
                      fontSize: "1.2rem",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#651214")}
                    onMouseLeave={(e) => (e.target.style.color = "#4d4d4d")}
                  >
                    <i className={`bi bi-${platform}`}></i>
                  </a>
                </li>
              ))}
            </ul>

            {token ? (
              <button
                onClick={logout}
                className="signout-link text-decoration-none"
                style={{ color: "#651214", fontWeight: "bold" }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="signout-link text-decoration-none"
                  style={{ color: "#651214", fontWeight: "bold" }}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="signout-link text-decoration-none"
                  style={{ color: "#651214", fontWeight: "bold" }}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
