import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Button } from "UI";
import GoogleMap from "components/GoogleMap";
import { WebsiteSvg, FavoriteSvg, CloseSvg } from "icons";

function ClubCard({ id, name, address, phones, photos }) {
  const [showNumber, setToggleNumber] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [eventMapId, setEventMapId] = useState(null);

  const [thumb] = photos;
  const [phone] = JSON.parse(phones);

  const isMap = eventMapId === id;
  const isFavorite = favoriteId === id;

  return (
    <div
      className="relative overflow-hidden w-full md:w-1/2 lg:w-1/3 hd:w-1/4 mb-6 px-3 rounded-t-lg"
      key={id}
    >
      <div
        className="relative overflow-hidden rounded-t-lg"
        style={{
          backgroundImage: `url(${thumb.url})`,
          backgroundSize: "cover",
          height: 335
        }}
      >
        {/* Extract to component */}
        {isMap ? (
          <div
            className="absolute z-30 top-0 right-0 p-3-5"
            onClick={() => setEventMapId(null)}
          >
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10">
              <CloseSvg></CloseSvg>
            </button>
          </div>
        ) : (
          <div
            className="absolute z-20 top-0 right-0 p-3-5"
            onClick={() => setFavoriteId(isFavorite ? null : id)}
          >
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10">
              <FavoriteSvg active={isFavorite}></FavoriteSvg>
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
          <div>{name}</div>
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="flex justify-between text-xs cursor-pointer">
          <div className="flex flex-col pr-4">
            <p className="py-1 font-bold" onClick={() => setEventMapId(id)}>
              {address}
            </p>
            <p className="text-grey">30 km from me</p>

            <div className="flex">
              <div className="flex bg-xs-grey px-3 py-1 mt-2 rounded-full">
                <span
                  className={cx("block whitespace-no-wrap overflow-hidden", {
                    "w-8": !showNumber
                  })}
                >
                  +{phone}
                </span>
                {!showNumber && (
                  <span
                    className="ml-4 text-red whitespace-no-wrap"
                    onClick={() => setToggleNumber(!showNumber)}
                  >
                    Show number
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <img src="/static/img/club-logo.png" alt="" />
            <div className="flex mt-2">
              <WebsiteSvg></WebsiteSvg>
              <span className="ml-1 whitespace-no-wrap text-grey">
                visit site
              </span>
            </div>
          </div>
        </div>
      </div>
      {isMap && (
        <div>
          <GoogleMap className="absolute top-0 left-0 z-20 px-2"></GoogleMap>
          <div className="absolute bottom-0 left-0 z-30 p-6">
            <Button className="px-6" size="sm">
              Get me to the club
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

ClubCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  photos: PropTypes.array
};

export default ClubCard;
