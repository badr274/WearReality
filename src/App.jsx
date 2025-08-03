import { Route, Routes } from "react-router";
import Home from "./Pages/home/Home";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
