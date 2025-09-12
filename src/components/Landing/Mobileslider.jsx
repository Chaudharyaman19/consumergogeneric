import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import "../../css/Mobileslider.css";
import slides1 from "../../assets/slides1.png";
import slides2 from "../../assets/slides2.png";
import slides3 from "../../assets/slides3.png";
import slides4 from "../../assets/slides4.png";

import { Navigation, Autoplay } from "swiper/modules";

export default function UniqueSlider() {
  return (
    <div className="unique-app">
      <Swiper
        loop={true}
        navigation={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        className="unique-swiper"
      >
        <SwiperSlide className="unique-slide">
          <img src={slides1} alt="" />
        </SwiperSlide>
        <SwiperSlide className="unique-slide">
          <img src={slides2} alt="" />
        </SwiperSlide>
        <SwiperSlide className="unique-slide">
          <img src={slides3} alt="" />
        </SwiperSlide>
        <SwiperSlide className="unique-slide">
          <img src={slides4} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
