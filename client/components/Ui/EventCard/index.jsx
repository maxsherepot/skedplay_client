import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";

import { Button } from "UI";
import EventLabel from "./EventLabel";
import GoogleMap from "components/GoogleMap";
import { MapSvg, FavoriteSvg, CloseSvg } from "icons";

function EventCard({ className, id, title, club, type, photos, href }) {
  const [favoriteId, setFavoriteId] = useState(null);
  const [eventMapId, setEventMapId] = useState(null);

  const [thumb] = photos;

  const isMap = eventMapId === id;
  const isFavorite = favoriteId === id;

  return (
    <div
      className={cx(
        "relative overflow-hidden mb-6 px-3 rounded-t-lg",
        className
      )}
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
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
              <CloseSvg></CloseSvg>
            </button>
          </div>
        ) : (
          <div
            className="absolute z-20 top-0 right-0 p-3-5"
            onClick={() => setFavoriteId(isFavorite ? null : id)}
          >
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
              <FavoriteSvg active={isFavorite}></FavoriteSvg>
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
          {!isMap && (
            <div className="flex flex-wrap -mx-3">
              <div className="px-3">
                <Button
                  className="text-xs px-2 lg:px-4"
                  weight="normal"
                  size="xxs"
                >
                  TODAY
                </Button>
              </div>
              <div className="px-3">
                <EventLabel type={type}></EventLabel>
              </div>
            </div>
          )}
          {/* {title} */}
          {href ? (
            <Link href={`${href}/[id]`} as={`${href}/${id}`}>
              <a className="hover:text-red">Ultra Party</a>
            </Link>
          ) : (
            <div>Ultra Party</div>
          )}
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="flex items-center text-sm mb-2">
          <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full"></span>
          Karlheinz Stockhausen, {id}
        </div>
        <div
          className="flex flex-wrap justify-between text-xs cursor-pointer"
          onClick={() => setEventMapId(id)}
        >
          <div className="py-1">{club.address}</div>
          <div className="flex p-1">
            <MapSvg></MapSvg>
            <span className="ml-1 whitespace-no-wrap">150 km</span>
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

EventCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  club: PropTypes.object,
  photos: PropTypes.array
};

export default EventCard;
