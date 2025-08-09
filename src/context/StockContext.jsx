import { createContext, useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState(() => {
    const storedStock = localStorage.getItem("stockData");
    return storedStock ? JSON.parse(storedStock) : [];
  });

  useEffect(() => {
    if (stockData.length === 0) {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/products")
        .then((res) => {
          const products = res.data.data;
          const stockArray = products.map((product) => ({
            productId: product.id,
            stock: Math.floor(Math.random() * 20) + 1,
          }));
          setStockData(stockArray);
          localStorage.setItem("stockData", JSON.stringify(stockArray));
        })
        .catch((err) => {
          console.error("Error fetching stock data:", err);
        });
    }
  }, [stockData]);

  useEffect(() => {
    if (stockData.length > 0) {
      localStorage.setItem("stockData", JSON.stringify(stockData));
    }
  }, [stockData]);

  return (
    <StockContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockProvider;
