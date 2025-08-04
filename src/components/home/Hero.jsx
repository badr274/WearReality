import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import images from "../../images/shop1.jpg"
import imag from "../../images/shop8.jpg"
import "swiper/css";
import "swiper/css/pagination";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
  },
  slideContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  
  },
};

const Hero = () => {
  return (
  <div className="container mt-5 mb-5">
      <div>
      <Swiper 
      className="my-swiper"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay:3000,
          disableOnInteraction:false
        }}
        
      >
        <SwiperSlide>
          <div style={styles.slideContent }>
            <img src={images} alt="Slide 1" style={styles.image} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={styles.slideContent}>
          <img src={imag} alt="Slide 2" style={styles.image} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  );
};

export default Hero;
