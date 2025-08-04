import Categories from "../../components/home/Categories";
import Hero from "../../components/home/Hero";

import "./home.css";
import LatestProduct from "../../components/home/LatestProduct";
const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <LatestProduct />
    </div>
  );
};

export default Home;
