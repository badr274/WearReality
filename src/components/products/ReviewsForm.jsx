import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ReviewsContext } from "../../context/ReviewsContext";
import LoadingSpinner from "../LoadingSpinner";

const ReviewsForm = ({
  showReviewModal,
  setShowReviewModal,
  productId,
  productCategory,
}) => {
  const { userName } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState({
    caption: "",
    numOfUse: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const { setUnderReview } = useContext(ReviewsContext);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setReviewsData((prev) => ({ ...prev, image: reader.result })); // Base64 string
      };

      reader.readAsDataURL(file);
    } else {
      setReviewsData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!reviewsData.caption.trim()) newErrors.caption = "Caption is required";
    if (!reviewsData.numOfUse || reviewsData.numOfUse <= 0)
      newErrors.numOfUse = "Number of use must be greater than 0";
    if (!reviewsData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancelReview = () => {
    setReviewsData({
      caption: "",
      numOfUse: "",
      image: null,
    });
    setErrors({});
    setShowReviewModal(false);
  };

  const handleAddToUnderReview = () => {
    if (!validateForm()) return;
    setLoading(true);
    setUnderReview((prev) => [
      ...prev,
      {
        reviewId: crypto.randomUUID(),
        username: String(userName).split(" ")[0],
        productId,
        ...reviewsData,
        productCategory: productCategory,
        createdAt: new Date(),
      },
    ]);
    setTimeout(() => {
      setLoading(false);
      handleCancelReview();
    }, 800);
  };
  return (
    showReviewModal && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "450px",
            boxShadow: "5px 0 10px rgba(0,0,0,0.1)",
            zIndex: 1050,
          }}
        >
          <h5 className="mb-4">Add New Review</h5>

          <textarea
            className="form-control mb-1"
            name="caption"
            placeholder="Caption"
            value={reviewsData.caption}
            onChange={handleInputChange}
          />
          {errors.caption && (
            <small className="text-danger">{errors.caption}</small>
          )}

          <input
            className="form-control mb-1"
            type="number"
            name="numOfUse"
            placeholder="Number of use"
            value={reviewsData.numOfUse}
            onChange={handleInputChange}
          />
          {errors.numOfUse && (
            <small className="text-danger">{errors.numOfUse}</small>
          )}

          <input
            className="form-control mb-1"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.image && (
            <small className="text-danger">{errors.image}</small>
          )}

          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary me-2"
              onClick={handleCancelReview}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddToUnderReview}
            >
              {loading ? <LoadingSpinner message="" /> : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewsForm;
