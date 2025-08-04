import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import MyNavbar from "./components/MyNavbar";
import Contact from "./Pages/Foulder/Contact";

function App() {
  return (
    // <Router>
  <>
<MyNavbar/>

<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </>
    
   
    
    // </Router>
  );
}

export default App;
