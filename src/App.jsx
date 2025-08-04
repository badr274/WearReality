import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import MyNavbar from "./components/MyNavbar";
import MyFooter from "./components/MyFooter";
import About from "./Pages/About/About";
function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <MyFooter />
    </>
  );
}

export default App;
