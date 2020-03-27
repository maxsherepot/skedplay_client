import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Link from "next/link";
import { Button } from "UI";
import EventLabel from "./EventLabel";
import { FavoriteButton } from "components/favorite";
import { MapSvg, CloseSvg } from "icons";
import Distance from "components/distance";
import EntityMaps from "components/maps/EntityMaps";
import {useTranslation} from "react-i18next";
import * as moment from "moment";

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

function renderToday(start_date, end_date) {
  const { t } = useTranslation();

  if (!start_date || !end_date) {
    return '';
  }

  const today = moment().unix();
  const start = moment(start_date).unix();
  const end = moment(end_date).unix();

  if (start > today || end < today) {
    return '';
  }

  return (
      <div className="px-3">
        <Button
            className="text-xs px-2 lg:px-4"
            weight="normal"
            size="xxs"
        >
          {t('index.today')}
        </Button>
      </div>
  )
}

function renderTime(start_time) {

  if (!start_time) {
    return '';
  }

  const time = start_time.substring(0,5);

  return (
      <div className="px-3 c-events-time">
        {time}
      </div>
  )
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
  height,
  lat,
  lng,
  address,
  start_date,
  end_date,
  price,
  start_time
}) {
  const [eventMapId, setEventMapId] = useState(null);

  const [thumb] = photos;

  const isMap = eventMapId === id;

  const {t, i18n} = useTranslation();

  lat = lat || (club && club.lat);
  lng = lng || (club && club.lng);

  return (
    <div
      className={cx(
        "relative overflow-hidden mb-6 px-3 rounded-t-lg",
        className
      )}
      key={id}
    >
      <div
        className="relative overflow-hidden rounded-t-lg c-events-card"
        style={{
          backgroundImage: `url(${thumb && thumb.url || '/static/img/event-none.png'})`,
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
                <EventLabel type={type} />
              </div>
              {renderToday(start_date, end_date)}
              {renderTime(start_time)}
              {price ? <div className="px-3 c-events-time">{price}$</div> : ''}
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
          <div className="py-1">{address || (club && club.address)}</div>

          {(lat && lng) &&
            <Distance
              originByGeo={true}
              destination={{lat, lng}}
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
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  start_time: PropTypes.string,
  club: PropTypes.object,
  photos: PropTypes.array
};

export default EventCard;
