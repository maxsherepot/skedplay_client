import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";

import { Button } from "UI";
import { FavoriteButton } from "components/favorite";
import GoogleMap from "components/GoogleMap";
import { WebsiteSvg, FavoriteSvg, MapSvg, CloseSvg } from "icons";
import Distance from "components/distance";
import MapDirection from "components/maps/MapDirection";
import EntityMaps from "components/maps/EntityMaps";

function DistanceView({distanceKm}) {
  if (!distanceKm) {
    return '';
  }

  return (
    <p className="text-grey">{distanceKm} km from me</p>
  );
}

function ClubCard({ id, name, address, favorited, phones, photos, gridClasses = true, lat, lng }) {
  let phone;
  const [showNumber, setToggleNumber] = useState(false);
  const [eventMapId, setEventMapId] = useState(null);

  const [thumb] = photos;

  const phonesList = JSON.parse(phones);

  if (phonesList.length) {
    const [number] = phonesList;
    phone = number
  }

  const isMap = eventMapId === id;

  return (
    <div
      className={cx([
        "relative overflow-hidden mb-6 px-3 rounded-t-lg",
        gridClasses ? "w-full md:w-1/2 lg:w-1/3 hd:w-1/4" : "",
      ])}
      key={id}
    >
      <div
        className="relative overflow-hidden rounded-t-lg"
        style={{
          backgroundImage: `url(${thumb && thumb.url})`,
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
          <div className="absolute z-20 top-0 right-0 p-3-5">
            <FavoriteButton
              variables={{ model_id: id, model_type: "club" }}
              favorited={favorited}
              small={true}
              iconWidth={18}
              iconHeight={16}
            />
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white hover:text-red cursor-pointer z-30">
          <Link href="/clubs/[id]/information" as={`/clubs/${id}/information`}>
            <a>{name}</a>
          </Link>
        </div>
      </div>
      <div className="bg-white p-5 rounded-b-lg">
        <div className="flex justify-between text-xs cursor-pointer">
          <div className="flex flex-col pr-4">
            <p className="py-1 font-bold" onClick={() => setEventMapId(id)}>
              {address}
            </p>
            {(lat && lng) &&
              <Distance
                originByGeo={true}
                destination={{lat, lng}}
              >
                <DistanceView/>
              </Distance>
            }

            <div className="flex">
              {phone && (<div className="flex bg-xs-grey px-3 py-1 mt-2 rounded-full">
                <span
                  className={cx("block whitespace-no-wrap overflow-hidden", {
                    "w-8": !showNumber
                  })}
                >
                  {phone}
                </span>
                {!showNumber && (
                  <span
                    className="ml-4 text-red whitespace-no-wrap"
                    onClick={() => setToggleNumber(!showNumber)}
                  >
                    Show number
                  </span>
                )}
              </div>)}
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
          <div
            className="google-map absolute top-0 left-0 z-20 px-3"
            style={{ height: "100%", width: "100%" }}
          >
            <EntityMaps
              entity={{lat, lng}}
              height="100%"
              goBtnLeft={true}
            />
          </div>

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
  // gridClasses: PropTypes.boolean,
  photos: PropTypes.array
};

export default ClubCard;
