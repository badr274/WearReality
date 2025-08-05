import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Products from "./Pages/Products";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import About from "./Pages/About/About";
import PersistLogin from "./components/routes/PersistLogin";
import Contact from "./Pages/contact/Contact";
import Cart from "./Pages/cart/Cart";


function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      <MyFooter />
    </>
  );
}

export default App;
