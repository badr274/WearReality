import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoutes = () => {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
