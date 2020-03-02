import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";
import { Button } from "UI";
import EventLabel from "./EventLabel";
import { FavoriteButton } from "components/favorite";
import GoogleMap from "components/GoogleMap";
import { MapSvg, CloseSvg } from "icons";
import Distance from "components/distance";
import MapDirection from "components/maps/MapDirection";
import EntityMaps from "components/maps/EntityMaps";
import {useTranslation} from "react-i18next";

function DistanceView({distanceKm}) {
  if (!distanceKm) {
    return (
      <div className="flex py-1 pr-1">
        <MapSvg />
      </div>
    );
  }

  const {t, i18n} = useTranslation();

  return (
    <div className="flex py-1 pr-1">
      <MapSvg />
      <span className="ml-1 whitespace-no-wrap">{distanceKm} {t('index.km')}</span>
    </div>
  );
}

function EventCard({
  className,
  id,
  title,
  club,
  favorited,
  type,
  photos,
  href,
  height
}) {
  const [eventMapId, setEventMapId] = useState(null);

  const [thumb] = photos;

  const isMap = eventMapId === id;

  const {t, i18n} = useTranslation();

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
          backgroundImage: `url(${thumb.url || '/static/img/event-none.png'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height
        }}
      >
        {/* Extract to component */}
        {isMap ? (
          <div
            className="absolute z-30 top-0 right-0 p-3-5"
            onClick={() => setEventMapId(null)}
          >
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
              <CloseSvg />
            </button>
          </div>
        ) : (
          <div className="absolute z-20 top-0 right-0 p-3-5">
            <FavoriteButton
              variables={{ model_id: id, model_type: "event" }}
              favorited={favorited}
              small={true}
              iconWidth={18}
              iconHeight={16}
            />
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
                  {t('index.today')}
                </Button>
              </div>
              <div className="px-3">
                <EventLabel type={type} />
              </div>
            </div>
          )}
          {/* {title} */}
          {href ? (
            <Link href={`${href}/[id]`} as={`${href}/${id}`}>
              <a className="hover:text-red">{t('employees.ultra_party')}</a>
            </Link>
          ) : (
            <div>{t('employees.ultra_party')}</div>
          )}
        </div>
      </div>
      <div className="bg-white p-5">
        <div className="flex items-center text-sm mb-2">
          <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full" />
          Karlheinz Stockhausen, {id}
        </div>
        <div
          className="flex flex-wrap justify-between text-xs cursor-pointer"
          onClick={() => setEventMapId(id)}
        >
          <div className="py-1">{club.address}</div>

          {(club.lat && club.lng) &&
            <Distance
              originByGeo={true}
              destination={{lat: club.lat, lng: club.lng}}
            >
              <DistanceView/>
            </Distance>
          }
        </div>
      </div>
      {isMap && (
        <div>
          <div
            className="google-map absolute top-0 left-0 z-20 px-3"
            style={{ height: "100%", width: "100%" }}
          >
            <EntityMaps
              entity={club}
              height="100%"
              goBtnLeft={true}
            />
          </div>

          <div className="absolute bottom-0 left-0 z-30 p-6">
            <Button className="px-6" size="sm">
              {t('employees.get_me')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

EventCard.defaultProps = {
  height: 335
};

EventCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  club: PropTypes.object,
  photos: PropTypes.array
};

export default EventCard;
