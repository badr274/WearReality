import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-5 mb-5 container">
      <h2 className="fw-normal mb-3 fs-4 fs-md-3 fs-lg-2">
        Shop Popular Categories
      </h2>
      <Swiper
        className="categories-swiper"
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 8,
          },
        }}
      >
        {categories.map((cat, idx) => (
          <SwiperSlide className="text-center" key={idx}>
            <img
              src={cat.image}
              alt={cat.name}
              className="w-100 rounded"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <p className="mt-2 fw-semibold">{cat.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
