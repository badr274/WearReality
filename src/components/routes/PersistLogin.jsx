import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const PersistLogin = () => {
  const { token } = useContext(AuthContext);
  return !token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PersistLogin;
