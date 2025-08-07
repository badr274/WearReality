import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const isFashion =
    product?.category?.name === "Men's Fashion" ||
    product?.category?.name === "Women's Fashion";

  const proofData = isFashion ? proofOfWearData : proofOfUseData;

  return (
    <div className="container p-4 my-5">
      {product ? (
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
              {product?.category?.name}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-2">
              <p>
                <span className="fw-bold">Price:</span> ${product?.price}
              </p>
              <p>
                <span className="fw-bold">Rating:</span>{" "}
                {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
              </p>
            </div>
            <button
              style={{ background: "var(--main-color)" }}
              className="btn w-100 text-white mb-4"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

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
                  <SwiperSlide key={idx}>
                    <div
                      className="border rounded p-3 shadow-sm bg-white mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      <img
                        src={img}
                        alt={`proof-${idx}`}
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
                                    proofData[idx]?.uses === 1 ? "use" : "uses"
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
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
