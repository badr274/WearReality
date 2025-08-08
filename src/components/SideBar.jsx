import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import adminImage from "/images/admin.jpg";
export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "fit-content",
        background: "#f0f1f3ff",
        boxShadow: "3px 0 10px rgba(73, 73, 73, 0.1)",
        padding: "20px",
        position: "fixed",
        height: "100%",
      }}
      className=""
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "rgb(101, 18, 20)",
        }}
      >
        <img
          src={adminImage}
          alt="admin image"
          className="rounded-circle me-2"
          style={{ width: "40px", height: "40px" }}
        />
        <span
          className="d-none d-lg-inline-block"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Wear Reality
        </span>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              cursor: "pointer",
              fontWeight: "500",
              color: isActive("/dashboard") ? "rgb(101, 18, 20)" : "#595c5f",
              backgroundColor: isActive("/dashboard")
                ? "#4f4d4d7b"
                : "transparent",
              borderRadius: "8px",
              padding: "8px",
              gap: "10px",
            }}
          >
            <i
              className="bi bi-box-fill mx-auto"
              style={{ fontSize: "18px" }}
            ></i>
            <span className="d-none d-lg-inline-block flex-fill">Product</span>
          </li>
        </Link>

        <Link to="/dashboard/analytics" style={{ textDecoration: "none" }}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              cursor: "pointer",
              fontWeight: "500",
              color: isActive("/dashboard/analytics")
                ? "rgb(101, 18, 20)"
                : "#595c5f",
              backgroundColor: isActive("/dashboard/analytics")
                ? "#4f4d4d7b"
                : "transparent",
              borderRadius: "8px",
              padding: "8px",
              gap: "10px",
            }}
          >
            <i
              className="bi bi-bar-chart-fill mx-auto"
              style={{ fontSize: "18px" }}
            ></i>
            <span className="d-none d-lg-inline-block flex-fill">
              Analytics
            </span>
          </li>
        </Link>

        <Link to="/dashboard/customer" style={{ textDecoration: "none" }}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              cursor: "pointer",
              fontWeight: "500",
              color: isActive("/dashboard/customer")
                ? "rgb(101, 18, 20)"
                : "#595c5f",
              backgroundColor: isActive("/dashboard/customer")
                ? "#4f4d4d7b"
                : "transparent",
              borderRadius: "8px",
              padding: "8px",
              gap: "10px",
            }}
          >
            <i
              className="bi bi-person-fill mx-auto"
              style={{ fontSize: "18px", width: "fit-content" }}
            ></i>
            <span className="d-none d-lg-inline-block flex-fill">Customer</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
