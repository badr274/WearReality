import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedDashboard = () => {
  const { token } = useContext(AuthContext);
  const role = localStorage.getItem("role");
  return token && role === "admin" ? <Outlet /> : <Navigate to={"*"} />;
};

export default ProtectedDashboard;
