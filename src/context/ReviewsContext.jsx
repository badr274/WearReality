import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ReviewsContext = createContext({});

const ReviewsProvider = ({ children }) => {
  const getStoredData = (key) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error(`Invalid data for ${key} in localStorage`, err);
      return [];
    }
  };

  const [underReview, setUnderReview] = useState(getStoredData("underReview"));
  const [acceptedReviews, setAcceptedReviews] = useState(
    getStoredData("acceptedReviews")
  );
  useEffect(() => {
    localStorage.setItem("underReview", JSON.stringify(underReview));
    localStorage.setItem("acceptedReviews", JSON.stringify(acceptedReviews));
  }, [acceptedReviews, underReview]);
  return (
    <ReviewsContext.Provider
      value={{
        underReview,
        setUnderReview,
        acceptedReviews,
        setAcceptedReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};
export default ReviewsProvider;
