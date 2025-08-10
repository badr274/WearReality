import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ReviewsContext } from "../../context/ReviewsContext";
import { CartContext } from "../../context/CartContext";
import { StockContext } from "../../context/StockContext";
import ReviewsForm from "../../components/products/ReviewsForm";
import ProofOfWear from "../../components/products/ProofOfWear";
import ProductDetailsSkeleton from "../../components/products/ProductDetailsSkeleton";

const proofOfWearData = [
  {
    caption: "After 3 washes – the color is still intact.",
    userName: "Sarah",
    washes: 3,
    uploadedAt: "2025-08-06T12:30:00Z",
  },
  {
    caption: "After 5 washes – the fabric feels amazing.",
    userName: "Mohamed",
    washes: 5,
    uploadedAt: "2025-08-05T18:45:00Z",
  },
  {
    caption: "After 7 washes – still looks brand new!",
    userName: "Lina",
    washes: 7,
    uploadedAt: "2025-08-04T10:15:00Z",
  },
  {
    caption: "After 10 washes – no color fading at all.",
    userName: "John",
    washes: 10,
    uploadedAt: "2025-08-03T15:20:00Z",
  },
];

const proofOfUseData = [
  {
    caption: "Used for 1 week – battery life is solid.",
    userName: "Ahmed",
    uses: 7,
    uploadedAt: "2025-08-06T14:20:00Z",
  },
  {
    caption: "After 10 uses – still works like new.",
    userName: "Fatima",
    uses: 10,
    uploadedAt: "2025-08-05T11:00:00Z",
  },
  {
    caption: "Used daily for 2 weeks – no issues.",
    userName: "Hossam",
    uses: 14,
    uploadedAt: "2025-08-04T09:00:00Z",
  },
  {
    caption: "After 20 uses – high performance maintained.",
    userName: "Nour",
    uses: 20,
    uploadedAt: "2025-08-03T16:45:00Z",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addToCart } = useContext(CartContext);
  const { stockData } = useContext(StockContext);
  const { acceptedReviews } = useContext(ReviewsContext);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const productReviews = acceptedReviews.filter(
    (item) => item.productId === product?._id
  );

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const adjustHeights = () => {
      const cards = document.querySelectorAll(".proof-card");
      let maxHeight = 0;
      cards.forEach((card) => {
        card.style.height = "auto";
        maxHeight = Math.max(maxHeight, card.offsetHeight);
      });
      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    };
    setTimeout(adjustHeights, 100);
    window.addEventListener("resize", adjustHeights);
    return () => window.removeEventListener("resize", adjustHeights);
  }, [product, productReviews]);

  const isFashion =
    product?.category?.name === "Men's Fashion" ||
    product?.category?.name === "Women's Fashion";
  const proofData = isFashion ? proofOfWearData : proofOfUseData;

  const currentStock =
    stockData.find((item) => item.productId === product?._id)?.stock ?? null;
  let stockColor = "green";
  if (currentStock === 0) stockColor = "red";
  else if (currentStock <= 5) stockColor = "orange";

  return (
    <div className="container p-4 my-5">
      <ReviewsForm
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        productId={product?._id}
        productCategory={product?.category?.name}
      />
      {product ? (
        <>
          <div className="row gx-4 gy-5">
            <div className="col-12 col-lg-4 text-center">
              <img
                src={product?.imageCover}
                className="img-fluid"
                alt={product?.title}
              />
            </div>

            <div className="col-12 col-lg-8 d-flex flex-column align-items-start">
              <h2>{product?.title}</h2>
              <p className="text-secondary">{product?.description}</p>
              <p>
                <span className="fw-bold">Category:</span>{" "}
                <span className="badge bg-primary">
                  {product?.category?.name}
                </span>
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-2">
                <p>
                  <span className="fw-bold">Price: </span> ${product?.price}
                </p>
                <p>
                  <span className="fw-bold">Rating: </span>
                  <span style={{ color: "#f4b400", fontWeight: "600" }}>
                    ★ {product?.ratingsAverage}
                  </span>
                  <span>
                    {productReviews?.length > 0
                      ? ` (${productReviews.length} review${
                          productReviews.length > 1 ? "s" : ""
                        })`
                      : ""}
                  </span>
                </p>
              </div>

              {currentStock !== null && (
                <p style={{ color: stockColor, fontWeight: "600" }}>
                  <span className="fw-bold">Stock: </span>
                  {currentStock === 0
                    ? "Out of Stock"
                    : currentStock <= 5
                    ? `Only ${currentStock} left!`
                    : `${currentStock} in stock`}
                </p>
              )}

              <div className="row gap-3 my-5 w-100">
                <button
                  style={{ background: "var(--main-color)" }}
                  className="btn flex-fill col-12 col-sm-5 text-white"
                  onClick={() => addToCart(product)}
                  disabled={currentStock === 0}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-fill col-12 col-sm-5 btn btn-outline-secondary"
                  onClick={() => setShowReviewModal(true)}
                >
                  Add Review
                </button>
              </div>

              <div className="w-100 mt-3">
                <h2 className="fs-4 fw-bold mb-3">
                  {isFashion ? "Proof of Wear" : "Proof of Use"}
                </h2>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  breakpoints={{
                    576: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                  }}
                >
                  {product.images.slice(0, 4).map((img, idx) => (
                    <SwiperSlide key={`proof-${idx}`}>
                      <div
                        className="proof-card border rounded p-3 shadow-sm bg-white mx-auto d-flex flex-column"
                        style={{ maxWidth: "100%" }}
                      >
                        <img
                          src={img}
                          alt={`proof-${idx}`}
                          className="img-fluid rounded object-fit-cover mb-1"
                          style={{ height: "250px", width: "100%" }}
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
                            “{proofData[idx]?.caption}”
                          </p>
                          <div className="mt-auto pt-3 border-top border-light-subtle text-small">
                            <div className="d-flex justify-content-between align-items-center mb-2 text-secondary">
                              <span className="fw-semibold text-dark">
                                By: {proofData[idx]?.userName}
                              </span>
                              <span className="text-muted">
                                {isFashion
                                  ? `After ${proofData[idx]?.washes} ${
                                      proofData[idx]?.washes === 1
                                        ? "wash"
                                        : "washes"
                                    }`
                                  : `After ${proofData[idx]?.uses} ${
                                      proofData[idx]?.uses === 1
                                        ? "use"
                                        : "uses"
                                    }`}
                              </span>
                            </div>
                            <div className="text-start small text-muted">
                              <span>Posted on: </span>
                              {new Date(
                                proofData[idx]?.uploadedAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  {productReviews.length > 0 &&
                    productReviews.map((review, idx) => (
                      <SwiperSlide key={`review-${idx}`}>
                        <ProofOfWear
                          review={review}
                          showBtns={false}
                          className="flex-grow-1 proof-card border rounded p-3 shadow-sm bg-white mx-auto d-flex flex-column"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ProductDetailsSkeleton />
      )}
    </div>
  );
};

export default ProductDetails;
