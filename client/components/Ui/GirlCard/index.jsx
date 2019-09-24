import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Badge, Slider } from "UI";
import Favorite from "components/Favorite";
import { MessageSvg, CocktailSvg } from "icons";

function GirlCard({ girl, labels, slider, available, height }) {
  const [sliderCardId, setSliderCardId] = useState(null);
  const [photo] = girl && girl.photos;

  const availableButtons = () => {
    const type = Math.floor(Math.random() * Math.floor(4));

    switch (type) {
      case 0:
        return (
          <div className="bg-black text-white text-xs rounded-full uppercase px-4">
            coming soon
          </div>
        );
      case 1:
        return (
          <div className="bg-dark-green text-white text-xs rounded-full uppercase px-4">
            available
          </div>
        );
      case 2:
        return (
          <div className="bg-grey text-white text-xs rounded-full uppercase px-4">
            attended us
          </div>
        );
      case 3:
        return (
          <div className="bg-divider text-white text-xs rounded-full uppercase px-4">
            not available
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div
      className="girls__item border border-red"
      style={{
        backgroundImage: `url(${photo && photo.thumb_url})`,
        height
      }}
      onMouseEnter={() => (available ? null : setSliderCardId(girl.id))}
      onMouseLeave={() => (available ? null : setSliderCardId(null))}
    >
      <div className="absolute z-20 top-0 right-0 p-3-5">
        <Favorite
          variables={{ model_id: girl.id, model_type: "employee" }}
          favorited={girl.favorited}
        />
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-end">
        {labels && (
          <div className="flex flex-row justify-between items-end p-3">
            <div className="flex flex-col">
              {girl.isNew && (
                <div className="mb-2">
                  <Badge className="bg-black">NEW</Badge>
                </div>
              )}
              {girl.isVip && (
                <div className="mb-2">
                  <Badge className="bg-red">VIP</Badge>
                </div>
              )}
              <div className="flex flex-wrap-reverse">
                <div className="rounded-full bg-xs-grey text-sm px-2-5 leading-relaxed py-1 mr-2 mt-2">
                  +38 050 145 78 89
                </div>
                <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7">
                  <MessageSvg />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-end justify-end flex-row">
              <button className="flex justify-center content-center rounded-full bg-xs-grey w-7 h-7">
                <CocktailSvg />
              </button>
              <button className="flex justify-center content-center rounded-full bg-red w-7 h-7 ml-3 mt-2">
                <span className="text-white font-bold text-2xs">100%</span>
              </button>
            </div>
          </div>
        )}
        {sliderCardId === girl.id && slider && (
          <div className="hidden lg:block">
            <Slider photos={girl.photos}></Slider>
          </div>
        )}
        <div className="bg-white w-full p-3 leading-loose">
          <Link
            href="/employees/[id]/information"
            as={`/employees/${girl.id}/information`}
          >
            <a className="text-sm font-medium leading-tight hover:text-red">
              {girl.name}, {girl.age}
            </a>
          </Link>
          {available ? (
            <div className="flex">{availableButtons()}</div>
          ) : (
            <div className="text-sm text-grey">
              <div className="inline-block bg-dark-green rounded-full w-2 h-2 mr-2"></div>
              150 km from me
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

GirlCard.defaultProps = {
  height: "467px",
  available: false,
  labels: true,
  slider: true
};

GirlCard.propTypes = {
  girl: PropTypes.object,
  labels: PropTypes.bool,
  slider: PropTypes.bool
};

export default GirlCard;
