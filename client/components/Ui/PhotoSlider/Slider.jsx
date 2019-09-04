import React from "react";
import PropTypes from "prop-types";

import Carousel from "react-multi-carousel";

import Slide from "./Slide";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

function Slider({ photos }) {
  const images = photos.map(photo => photo.thumb_url);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
      slidesToSlide: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
      slidesToSlide: 5
    }
  };

  return (
    <div className="slider px-6 pt-4">
      <Carousel
        ssr
        responsive={responsive}
        customLeftArrow={<ArrowLeft />}
        customRightArrow={<ArrowRight />}
      >
        {images.map((image, i) => (
          <Slide key={i} image={image} />
        ))}
      </Carousel>
    </div>
  );
}

Slider.propTypes = {
  photos: PropTypes.array
};

export default Slider;
