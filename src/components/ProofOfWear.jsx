import { useContext } from "react";
import { ReviewsContext } from "../context/ReviewsContext";

const ProofOfWear = ({ review, showBtns = false, className }) => {
  const { setUnderReview, setAcceptedReviews } = useContext(ReviewsContext);
  const isFashion =
    review?.productCategory === "Men's Fashion" ||
    review?.productCategory === "Women's Fashion";

  const handleCancelReview = (id) => {
    setUnderReview((prev) => prev.filter((review) => review.reviewId !== id));
  };
  const handleAcceptReview = (review) => {
    setAcceptedReviews((prev) => [...prev, review]);
    setUnderReview((prev) =>
      prev.filter((review) => review.reviewId !== review.reviewId)
    );
  };
  return (
    <div
      className={`border rounded p-3 shadow-sm bg-white  ${className}`}
      style={{ maxWidth: "400px" }}
    >
      <img
        src={review.image}
        alt={`proof`}
        className="img-fluid rounded object-fit-cover"
        style={{ maxHeight: "300px", width: "100%" }}
      />
      <div className="p-1 d-flex flex-column flex-grow-1">
        <p
          className="fs-6 text-dark fst-italic mb-3 lh-base"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          “{review?.caption}”
        </p>

        <div className="mt-auto pt-3 border-top border-light-subtle text-small">
          <div className="d-flex justify-content-between align-items-center mb-2 text-secondary">
            <span className="fw-semibold text-dark">
              By: {review?.username}
            </span>
            <span className="text-muted">
              {isFashion
                ? `After ${review?.numOfUse} ${
                    review?.numOfUse === 1 ? "wash" : "washes"
                  }`
                : `After ${review?.numOfUse} ${
                    review?.numOfUse === 1 ? "use" : "uses"
                  }`}
            </span>
          </div>

          <div className="text-start small text-muted">
            <span>Posted on: </span>
            {new Date(review?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      {showBtns ? (
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => handleCancelReview(review.reviewId)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleAcceptReview(review)}
          >
            Accept
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProofOfWear;
