import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import Slider from "react-slick";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import {PolygonSvg} from 'icons';

function GalleryWithThumbnail({ photos, favorite, large, handleClick }) {
  const [index, setIndex] = useState(0);

  const [mainNav, setMainNav] = useState(null);
  const [secondNav, setSecondNav] = useState(null);

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  let clickRefs = {};

  const setClickRef = (element, index) => {
    clickRefs[index] = element;
  };

  useEffect(() => {
    setMainNav(slider1);
    setSecondNav(slider2);
  });

  return (
    <div className="flex -mx-2">
      <div className="hidden md:block">
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
          {photos.map((photo, i) => (
            <div className="relative"  key={i}>
              {photo.type === 'video' &&
                <div className="absolute cursor-pointer" style={{top:'50%',left:'53%', transform: 'translate(-50%, -50%)'}}>
                  <PolygonSvg/>
                </div>
              }

              <img
                className={cx(
                  "thumb-slide object-cover rounded-lg h-36 outline-none cursor-pointer",
                  i % 2 !== 0 ? "my-2" : null
                )}
                src={photo.url}
                alt=""
              />
            </div>
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
          {photos.map((photo, i) => (
            <div className="relative" key={i}>
              {photo.type === 'video' &&
                <div
                  onClick={() => clickRefs[i].click()}
                  className="absolute cursor-pointer"
                  style={{top:'50%',left:'53%', transform: 'translate(-50%, -50%)'}}
                >
                  <PolygonSvg/>
                </div>
              }

              <img
                ref={element => setClickRef(element, i)}
                onClick={() => handleClick(i)}
                className="object-cover rounded-lg h-gallery sm:h-gallery-sm md:h-gallery-md lg:h-gallery-md"
                src={photo.url}
                alt=""
              />
            </div>
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

        <div className="flex justify-center lg:mb-12 sm:mb-2 absolute bottom-0 left-0 w-full z-10">
          <div className="text-xl text-white mb-10 sm:mb-3 pb-10 mx-5 my-8 select-none">
            {index + 1} / {photos.length}
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
