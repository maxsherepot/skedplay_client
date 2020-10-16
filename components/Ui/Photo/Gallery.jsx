import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Slider from "react-slick";
import Slide from "./Slide";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

function Gallery({ className, photos, favorite, large, height = "597px" }) {
  const node = useRef();
  const [index, setIndex] = useState(0);

  const images = photos.map(photo => photo.url);

  return (
    <div className={cx("relative", className)}>
      <Slider
        className="relative block"
        ref={node}
        arrows={false}
        infinite={false}
        beforeChange={(oldIndex, newIndex) => setIndex(newIndex)}
      >
        {images.map((image, i) => (
          <Slide
            key={i}
            className="rounded-lg"
            image={image}
            width="auto"
            height={height}
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
          onClick={() => node.current.slickPrev()}
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
          onClick={() => node.current.slickNext()}
        >
          <ArrowRight
            className="stroke-white"
            width={large ? "20" : "10"}
            height={large ? "60" : "30"}
          />
        </div>
      </div>

      <div className="flex justify-center absolute bottom-0 left-0 w-full">
        <div className="text-xl text-white mx-5 my-8 select-none">
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

Gallery.defaultProps = {
  large: false
};

Gallery.propTypes = {
  large: PropTypes.bool,
  photos: PropTypes.array
};

export default Gallery;
