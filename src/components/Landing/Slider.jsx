import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/slider.css";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import newcon from "../../assets/newcon.png";
import babuana from "../../assets/babuana.png";
import dore from "../../assets/dore.png";
import dora from "../../assets/dora.png";

const BannerSlider = () => {
  const sliderRef = useRef(null);

  const slides = [
    {
      img: newcon,
      title: "Welcome to Our Hospital",
      subtitle: "Providing the best healthcare for you and your family",
    },

    {
      img: dore,
      title: "24/7 Emergency Services",
      subtitle: "We are here for you anytime",
    },
    {
      img: dora,
      title: "Modern Facilities",
      subtitle: "Advanced equipment for accurate treatment",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  https: return (
    <div className="banner-slider desktopslide">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-container">
            <a href="https://play.google.com/store/apps/details?id=com.gogeneric.user">
              {" "}
              <img
                src={slide.img}
                alt={`Banner ${index}`}
                className="slider-img"
              />
            </a>
            <div className="slide-text">
              {/* <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p> */}
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Buttons */}
      <div className="slider-buttons">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="slider-btn prev-btn"
        >
          ⬅ Prev
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="slider-btn next-btn"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;
