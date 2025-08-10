import { useContext } from "react";
import { ReviewsContext } from "../../context/ReviewsContext";
import ProofOfWear from "../../components/products/ProofOfWear";

const Reviews = () => {
  const { underReview } = useContext(ReviewsContext);
  const renderReviews = underReview.map((item, idx) => {
    return (
      <ProofOfWear
        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        review={item}
        key={idx}
        showBtns={true}
      />
    );
  });
  return (
    <div className="container mt-4" style={{ padding: "30px" }}>
      <h2
        className="fw-normal mb-3 fs-4 fs-md-3 fs-lg-2 fw-bold mb-4"
        style={{ color: "rgb(101, 18, 20)" }}
      >
        Reviews
      </h2>
      <div className="row">
        {underReview.length === 0 ? (
          <div className="text-center text-muted my-5">
            <i className="bi bi-chat-square-text fs-1 mb-2"></i>
            <p>No reviews yet.</p>
          </div>
        ) : (
          renderReviews
        )}
      </div>
    </div>
  );
};

export default Reviews;
