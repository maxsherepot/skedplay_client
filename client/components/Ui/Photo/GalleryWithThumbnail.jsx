import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Slider from "react-slick";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

function GalleryWithThumbnail({ photos, favorite, large, handleClick }) {
  const [index, setIndex] = useState(0);

  const [mainNav, setMainNav] = useState(null);
  const [secondNav, setSecondNav] = useState(null);

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const images = photos.map(photo => photo.url);

  useEffect(() => {
    setMainNav(slider1);
    setSecondNav(slider2);
  });

  return (
    <div className="flex -mx-2">
      <div className="hidden lg:block px-2">
        <Slider
          className="gallery w-33"
          asNavFor={mainNav}
          ref={slider => setSlider2(slider)}
          slidesToShow={5}
          speed={50}
          infinite={false}
          swipeToSlide
          focusOnSelect
          arrows={false}
          vertical
          verticalSwiping
        >
          {images.map((image, i) => (
            <img
              key={i}
              className={cx(
                "thumb-slide object-cover rounded-lg h-36 outline-none cursor-pointer",
                i % 2 !== 0 ? "my-2" : null
              )}
              src={image}
              alt=""
            />
          ))}
        </Slider>
      </div>
      <div className="relative overflow-hidden flex-1 px-2">
        <Slider
          className="relative block z-10"
          asNavFor={secondNav}
          arrows={false}
          ref={slider => setSlider1(slider)}
          infinite={false}
          beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
        >
          {images.map((image, i) => (
            <img
              key={i}
              onClick={() => handleClick(i)}
              className="object-cover rounded-lg h-gallery sm:h-gallery-sm md:h-gallery-md lg:h-gallery-lg hd:h-gallery-hd"
              src={image}
              alt=""
            />
          ))}
        </Slider>

        <div className="absolute z-20 top-0 right-0 p-3-5">{favorite}</div>

        <div className="absolute inset-0 flex items-center">
          <div
            className={cx(
              "flex items-center justify-center cursor-pointer h-16 mr-3 z-50",
              large ? "w-20" : "w-16"
            )}
            onClick={() => slider1.slickPrev()}
          >
            <ArrowLeft
              className="stroke-white"
              width={large ? "20" : "10"}
              height={large ? "60" : "30"}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-end">
          <div
            className={cx(
              "flex items-center justify-center cursor-pointer h-16 z-50",
              large ? "w-20" : "w-16"
            )}
            onClick={() => slider1.slickNext()}
          >
            <ArrowRight
              className="stroke-white"
              width={large ? "20" : "10"}
              height={large ? "60" : "30"}
            />
          </div>
        </div>

        <div className="flex justify-center absolute bottom-0 left-0 w-full z-10">
          <div className="text-xl text-white mx-5 my-8 select-none">
            {index + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

GalleryWithThumbnail.defaultProps = {
  large: false
};

GalleryWithThumbnail.propTypes = {
  large: PropTypes.bool,
  photos: PropTypes.array
};

export default GalleryWithThumbnail;
