import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
      }}
    >
      <SideBar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
