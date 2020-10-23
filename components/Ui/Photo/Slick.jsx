import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Slider from "react-slick";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import Link from 'components/SlashedLink'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Badge } from "UI";
import { useTranslation } from "react-i18next";

function PrevArrow({ className, currentSlide, slideCount, onClick, onMouseOver }) {
  const disabled = currentSlide <= 0
  return (
    <div className={className} onClick={onClick} onMouseEnter={onMouseOver}>
      <ArrowLeft
        className={disabled ? "stroke-divider" : "stroke-red"}
        width="6"
        height="13"
      />
    </div>
  );
}

function NextArrow({ className, currentSlide, onClick, slideCount, onMouseOver }) {
  const disabled = currentSlide >= (Math.ceil(slideCount / 5) - 1)

  return (
    <div className={className} onClick={onClick} onMouseOver={onMouseOver}>
      <ArrowRight
        className={disabled ? "stroke-divider" : "stroke-red"}
        width="6"
        height="13"
      />
    </div>
  );
}

function Slick({ id, photos, labels, available, slider, className, link, as, noPhotoSrc, user }) {
  const { t } = useTranslation();
  const [sliderCardId, setSliderCardId] = useState(null);

  const [mainNav, setMainNav] = useState(null);
  const [secondNav, setSecondNav] = useState(null);

  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setMainNav(slider1);
    setSecondNav(slider2);
  });

  const isBlurPhoto = (photo) => {
    return JSON.parse(photo.custom_properties || '{}').porn && !user;
  };

  const getPhoto = (photo) => {
    if (isBlurPhoto(photo)) {
      // if (photo.thumb_blur_url) {
      photo.vip = true;

      // return photo.thumb_blur_url;
      // }
    }

    if (photo.thumb_url) {
      return photo.thumb_url;
    }

    return photo.url;
  };

  const images = photos.map(photo => ({ url: getPhoto(photo), vip: photo.vip }));
  const isActiveSlider = sliderCardId === id && slider;

  function getImagesBlock() {
    if (images.length === 0) {
      return (
        <div className="relative block">
          <img
            className={cx("object-cover", className)}
            src={noPhotoSrc}
            alt=""
          />
        </div>
      );
    }

    return (
      <Slider
        className="relative block"
        asNavFor={secondNav}
        arrows={false}
        fade={true}
        ref={slider => setSlider1(slider)}
      >
        {images.map((image, i) => {
          // if (i === 0) {
          //   return (
          //     <img
          //       key={i}
          //       className={cx("object-cover", className)}
          //       src={image}
          //       alt=""
          //     />
          //   );
          // }

          return (
            <div className="relative" key={i}>
              {image.vip &&
                <Badge className="center absolute top-0 left-0 bg-red">{t('common.vip_only')}</Badge>
              }

              <LazyLoadImage
                className={cx(
                  "object-cover",
                  className,
                  image.vip ? 'blur' : ''
                )}
                alt={``}
                src={image.url}
                effect="blur"
              />
            </div>
          );
        })}
      </Slider>
    );
  }

  function getInnerBlock() {
    return (
      <>
        {getImagesBlock()}

        {labels && (
          <div
            className={cx(
              "absolute transition inset-0 flex flex-row justify-between items-end p-3",
            )}
            style={{
              marginBottom: isActiveSlider && images.length > 0 ? "5.2rem" : 0,
            }}
          >
            {labels}
          </div>
        )}

        {images.length > 0 &&
          <div className={cx([
            "flex w-full absolute transition bottom-0 flex-col lg:justify-end  overflow-hidden",
            
            isActiveSlider ? "h-0 lg:h-24" : "h-0",
          ])}>
            <div className="slider px-6 pt-3">
              <Slider
                asNavFor={mainNav}
                ref={slider => setSlider2(slider)}
                slidesToShow={5}
                slidesToScroll={1}
                infinite={false}
                swipeToSlide={true}
                focusOnSelect={true}
                adaptiveHeight
                nextArrow={<NextArrow className="prev-arrow" />}
                prevArrow={<PrevArrow className="next-arrow" onMouseOver={() => { slider2.slickGoTo(0) }} />}
              >
                {images.map((image, i) => (
                  <div className="pr-1 outline-none" key={i}>
                    <LazyLoadImage
                      className={cx(
                        "object-cover rounded-lg h-15 outline-none cursor-pointer border border-white hover:border-red",
                        image.vip ? 'blur-sm' : ''
                      )}
                      alt={``}
                      src={image.url}

                      //onMouseEnter={() => { slider1.slickGoTo(i) }}
                      
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        }
      </>
    );
  }

  if (link && as) {
    return (
      <Link
        href={link}
        as={as}
      >
        <a
          className={cx("relative block", className)}
          onMouseEnter={() => (available ? null : setSliderCardId(id))}
          onMouseLeave={() => (available ? null : setSliderCardId(null))}
        >
          {getInnerBlock()}
        </a>
      </Link>
    );
  }

  return (
    <div
      className={cx("relative", className)}
      onMouseEnter={() => (available ? null : setSliderCardId(id))}
      onMouseLeave={() => (available ? null : setSliderCardId(null))}
    >
      {getInnerBlock()}
    </div>
  );
}

Slick.defaultProps = {
  className: "h-photo sm:h-photo-sm md:h-photo-md lg:h-photo-lg hd:h-photo-hd"
};

Slick.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  as: PropTypes.string,
  photos: PropTypes.array,
  labels: PropTypes.node,
  slider: PropTypes.bool,
  available: PropTypes.bool
};

export default Slick;
