import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";

import { FavoriteSvg } from "icons";
import Slide from "./Slide";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";

function Gallery({ photos }) {
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
            height="597px"
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

      <div className="absolute bottom-0 left-0 flex m-5">
        <div
          className="flex items-center justify-center bg-red rounded-full cursor-pointer w-12 h-12 mr-3"
          onClick={() => node.current.previous()}
        >
          <ArrowLeft width="12" height="25" stroke="#fff" />
        </div>
        <div
          className="flex items-center justify-center bg-red rounded-full cursor-pointer w-12 h-12"
          onClick={() => node.current.next()}
        >
          <ArrowRight width="12" height="25" stroke="#fff" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 text-xl text-white mx-5 my-8 select-none">
        {index} / {images.length}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  photos: PropTypes.array
};

export default Gallery;
