import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CategoriesSliderSkeleton from "./CategoriesSliderSkeleton";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);
  // RENDERS
  const renderCategories = categories.map((cat, idx) => {
    return (
      <SwiperSlide className="text-center" key={idx}>
        <img src={cat.image} alt={cat.name} className="w-100 rounded" />
        <p className="mt-2 fw-semibold">{cat.name}</p>
      </SwiperSlide>
    );
  });
  const renderSkeleton = Array.from({ length: 8 }).map((_, i) => {
    return (
      <SwiperSlide key={i}>
        <CategoriesSliderSkeleton />
      </SwiperSlide>
    );
  });
  return (
    <div className="mt-5 mb-5 container">
      <h2 className="fw-normal mb-3 fs-4 fs-md-3 fs-lg-2">
        Shop Popular Categories
      </h2>

      <Swiper
        className="categories-swiper my-swiper"
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
        {isLoading ? renderSkeleton : renderCategories}
      </Swiper>
    </div>
  );
};

export default Categories;
{
  Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="rounded bg-light categories-slider-skeleton"></div>
  ));
}
