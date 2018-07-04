import React from "react";
import Slider from "react-slick";

export default props => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const pokemonImageSlider = props.images.map((item, key) => {
    return (
      <img
        key={key}
        className="card-img-top"
        data-test={item}
        src={item}
        alt={""}
      />
    );
  });
  return <Slider {...sliderSettings}>{pokemonImageSlider}</Slider>;
};
