import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";

import { FavoriteSvg } from "icons";
import Slide from "./Slide";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

function Gallery({ photos, height = "597px" }) {
  const node = useRef();
  const [favorite, setFavorite] = useState(false);
  const [index, setIndex] = useState(1);
  const images = photos.map(photo => photo.url);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="relative">
      <Carousel
        ref={node}
        ssr
        responsive={responsive}
        beforeChange={nextSlide => {
          setIndex(nextSlide + 1);
        }}
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
      </Carousel>

      {/* Extract favorite logic in separate component */}
      <div
        className="absolute z-20 top-0 right-0 p-3-5"
        onClick={() => setFavorite(!favorite)}
      >
        <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
          <FavoriteSvg active={favorite}></FavoriteSvg>
        </button>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div
          className="flex items-center justify-center cursor-pointer w-20 h-16 mr-3 z-50"
          onClick={() => node.current.previous()}
        >
          <ArrowLeft className="stroke-white" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-end">
        <div
          className="flex items-center justify-center cursor-pointer w-20 h-16 z-50"
          onClick={() => node.current.next()}
        >
          <ArrowRight className="stroke-white" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-end justify-center">
        <div className="text-xl text-white mx-5 my-8 select-none">
          {index} / {images.length}
        </div>
      </div>
    </div>
  );
}

Gallery.propTypes = {
  photos: PropTypes.array
};

export default Gallery;
