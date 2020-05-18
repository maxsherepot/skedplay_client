import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Distance from "components/distance";
import cx from "classnames";
import { geolocated } from "react-geolocated";
import { RoadSvg, Phone1Svg, LinkSvg } from "icons";
import { Button } from "UI";

const DistanceView = ({ distanceValue }) => {
  if (!distanceValue) {
    return '';
  }

  const distanceKm = Math.round(distanceValue / 1000 * 10) / 10;

  return (
    <>
      ~{distanceKm} km
    </>
  )
};

const CurrentLocation = ({employee, mapRef, isGeolocationEnabled}) => {
  const {t, i18n} = useTranslation();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const lat = employee.current_lat || employee.lat;
  const lng = employee.current_lng || employee.lng;

  const getColor = (hover) => {
    return hover ? '#FFF' : '#FF3366';
  };

  const getTextColorClass = (hover, red = false) => {
    if (red) {
      return hover ? 'text-white' : 'text-red';
    }

    return hover ? 'text-white' : 'text-black';
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div>
        {employee.currentClub ?
          ''
          :
          <>
            <div className="text-grey">
              Current location
            </div>
            <div className="mt-3">
            <span className="font-bold text-lg">
              {employee.current_address || employee.address}
            </span>

              <span className="ml-3 text-xs text-grey">
              {(!!lat && !!lng) &&
              <Distance
                originByGeo={true}
                destination={{lat, lng}}
              >
                <DistanceView/>
              </Distance>
              }
            </span>
            </div>
          </>
        }
      </div>

      <div className="mt-3">
        {(!!lat && !!lng) &&
          <Button
            className="px-4 w-full flex items-center"
            size="sm"
            level="grey1"
            weight="normal"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            onClick={() => {
              if (isGeolocationEnabled) {
                scrollToRef(mapRef);

                return;
              }
              document.location.href =`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            }}
          >
            <div className="w-12 h-8 flex justify-center items-center border-r border-light-grey mr-5 pr-3">
              <RoadSvg color={getColor(hover1)}/>
            </div>
            <div className={cx(
              getTextColorClass(hover1),
              "font-bold text-lg"
            )}>
              Road me
            </div>
          </Button>
        }

        {employee.phone &&
          <Button
            className="px-4 w-full flex items-center mt-2"
            size="sm"
            level="grey1"
            weight="normal"
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            onClick={() => setShowPhone(true)}
          >
            <div className="w-12 h-8 flex justify-center items-center border-r border-light-grey mr-5 pr-3">
              <Phone1Svg color={getColor(hover2)}/>
            </div>
            <div
              className={cx(
              getTextColorClass(hover2),
                "font-bold text-lg"
              )}
            >
              {showPhone ? employee.phone : employee.phone.substring(0, 4)}
              {!showPhone &&
                <span
                  className={cx(
                    getTextColorClass(hover2, true),
                    "ml-2"
                  )}
                >
                  {t('schedule.view_phone')}
                </span>
              }
            </div>
          </Button>
        }

        <Button
          className="px-4 w-full flex items-center mt-2"
          size="sm"
          level="grey1"
          weight="normal"
          onMouseEnter={() => setHover3(true)}
          onMouseLeave={() => setHover3(false)}
        >
          <div className="w-12 h-8 flex justify-center items-center border-r border-light-grey mr-5 pr-3">
            <LinkSvg color={getColor(hover3)}/>
          </div>
          <div className={cx(
            getTextColorClass(hover3),
            "font-bold text-lg"
          )}>
            Send link
          </div>
        </Button>
      </div>
    </div>
  );
};

export default geolocated()(CurrentLocation);