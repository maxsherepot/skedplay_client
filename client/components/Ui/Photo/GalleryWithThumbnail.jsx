import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Slider from "react-slick";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import {PolygonSvg} from 'icons';
import { Badge } from "UI";
import {useTranslation} from "react-i18next";

function PrevArrow({ className, currentSlide, slideCount, onClick, onMouseOver}) {
  const disabled = currentSlide <= 0

  if (disabled) {
      return null
  }

  return (
      <div className={"flex justify-center mb-2 rounded-md cursor-pointer"} style={{borderRadius: "6px", backgroundColor: "#eaeaea"}} onClick={onClick} onMouseOver={onMouseOver}>
        <ExpandLess/>
      </div>
  );
}

function NextArrow({ currentSlide, onClick, slideCount, onMouseOver}) {
  const disabled = currentSlide >= (Math.ceil(slideCount/4) + 1)

  if (disabled) {
      return null
  }

  return (
    <div className={"flex justify-center mt-1 rounded-md cursor-pointer"} style={{borderRadius: "6px", backgroundColor: "#eaeaea"}} onClick={onClick} onMouseOver={onMouseOver}>
      <ExpandMore/>
    </div>
  );
}

function GalleryWithThumbnail({ photos, favorite, large, handleClick }) {
  const {t} = useTranslation();
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
          slidesToShow={4}
          speed={50}
          infinite={false}
          //swipeToSlide
          focusOnSelect
          vertical
          //verticalSwiping
          arrows={true}
          nextArrow={<NextArrow className="prev-arrow" />}
          prevArrow={<PrevArrow className="next-arrow"/>}
        >
          {photos.map((photo, i) => (
            <div className={"relative outline-none h-36"}  key={i} onClick={() => slider1.slickGoTo(i)}>
              {photo.type === 'video' &&
                <div className="absolute cursor-pointer" style={{top:'50%',left:'53%', transform: 'translate(-50%, -50%)'}}>
                  <PolygonSvg/>
                </div>
              }
              {/*{
                  photo.type === 'video' ?
                      <video className="thumb-slide object-cover rounded-lg h-36 outline-none cursor-pointer" playsInline frameborder="0" autoplay loop muted>
                          <source src={(photo.url || "").replace("/conversions", "").replace("-thumb.jpg", "." + ((photo.mime_type || "").split("/").length > 1 ? (photo.mime_type || "").split("/")[1] : ""))} type={photo.mime_type}/>
                      </video>

                      :
                      <img
                        className={cx(
                          "thumb-slide object-cover rounded-lg h-36 outline-none cursor-pointer",
                          i % 2 !== 0 ? "my-2" : null,
                          photo.vip ? 'blur-sm' : '',
                          i === index ? " border border-red " : ""
                        )}
                        src={photo.big_thumb_url}
                        alt=""
                      />
              }*/}

              <img
                className={cx(
                  "thumb-slide object-cover rounded-lg h-36 outline-none cursor-pointer",
                  i % 2 !== 0 ? "" : null,
                  photo.vip ? 'blur-sm' : '',
                  i === index ? " border border-red " : ""
                )}
                src={photo.big_thumb_url}
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
              {/*{photo.type === 'video' &&
                <div
                  onClick={() => clickRefs[i].click()}
                  className="absolute cursor-pointer"
                  style={{top:'50%',left:'53%', transform: 'translate(-50%, -50%)'}}
                >
                  <PolygonSvg/>
                </div>
              }*/}

              {photo.vip &&
                <Badge className="center absolute top-0 left-0 bg-red">{t('common.vip_only')}</Badge>
              }

              {
                  photo.type === 'video' ?
                      (
                          index === i ?
                              <video ref={element => setClickRef(element, i)}
                                     onClick={() => handleClick(i)}
                                     className="w-full object-cover rounded-lg h-gallery sm:h-gallery-sm md:h-gallery-md lg:h-gallery-md" playsInline frameborder="0" autoPlay loop muted>
                                  <source src={(photo.url || "").replace("/conversions", "").replace("-thumb.jpg", "." + ((photo.mime_type || "").split("/").length > 1 ? (photo.mime_type || "").split("/")[1] : ""))} type={photo.mime_type}/>
                              </video>
                              :
                              null
                      )
                      :
                      <img
                        ref={element => setClickRef(element, i)}
                        onClick={() => handleClick(i)}
                        className={cx(
                          "w-full object-cover rounded-lg h-gallery sm:h-gallery-sm md:h-gallery-md lg:h-gallery-md",
                          photo.vip ? 'blur-xl' : '',
                        )}
                        src={photo.big_thumb_url}
                        alt=""
                      />
              }

            </div>
          ))}
        </Slider>

        <div className="absolute z-20 top-0 right-0 py-6 px-8">{favorite}</div>

        <div className="absolute inset-0 flex items-center">
          <div
            className={cx(
              "flex items-center justify-center cursor-pointer h-16 mr-3 z-50",
              large ? "w-20" : "w-16",
              index === 0 ? "hidden" : ""
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
              large ? "w-20" : "w-16",
              (photos.length - 1) === index ? "hidden" : ""
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
          <div className="text-xl text-white pb-10 mx-5 sm:my-4 select-none">
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
