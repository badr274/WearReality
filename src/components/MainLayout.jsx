import { Outlet } from "react-router";
import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";

const MainLayout = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
      <MyFooter />
    </>
  );
};

export default MainLayout;
