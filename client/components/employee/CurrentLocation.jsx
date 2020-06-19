import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import Distance from "components/distance";
import cx from "classnames";
import { geolocated } from "react-geolocated";
import { RoadSvg, Phone1Svg, LinkSvg, AttentionSvg } from "icons";
import { Button } from "UI";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { DO_EVENT } from "queries";

import Link from 'components/SlashedLink'
import EmployeeComplaintPopup from "components/popups/EmployeeComplaintPopup";
import EmployeeComplaintSuccessPopup from "components/popups/EmployeeComplaintSuccessPopup";
import ym from 'react-yandex-metrika';
import {useMutation} from "@apollo/react-hooks";

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

const CurrentLocation = ({user, employee, mapRef, isGeolocationEnabled}) => {
  const {t, i18n} = useTranslation();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showComplaintSuccessPopup, setShowComplaintSuccessPopup] = useState(false);
  const [doEvent] = useMutation(DO_EVENT);

  if (typeof window === 'undefined') {
    return null;
  }

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  const lat = (employee.current_club && employee.current_club.lat)
    || employee.current_lat
    || employee.lat;

  const lng = (employee.current_club && employee.current_club.lng)
    || employee.current_lng
    || employee.lng;

  const address = (employee.current_club && employee.current_club.address)
    || employee.current_address
    || employee.address;

  const getColor = (hover) => {
    return hover ? '#FFF' : '#FF3366';
  };

  const getTextColorClass = (hover, red = false) => {
    if (red) {
      return hover ? 'text-white' : 'text-red';
    }

    return hover ? 'text-white' : 'text-black';
  };

  const copy = () => {
    setCopied(true);

    doEvent({
      variables: {
        model_type: 'employee',
        model_id: employee.id,
        event: 'link',
      }
    });

    setTimeout(() => setCopied(false), 5000);
  };

  const showMePhone = () => {
    if (showPhone) {
      doEvent({
        variables: {
          model_type: 'employee',
          model_id: employee.id,
          event: 'call',
        }
      });

      document.location.href = `tel:${employee.phone}`;

      return;
    }

    setShowPhone(true);

    if (process.env.ANALYTICS_SCRIPTS === 'true') {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      gtag('event', 'show_phone', {'event_category' : 'click'});
      ym('reachGoal', 'show_phone');
    }

    doEvent({
      variables: {
        model_type: 'employee',
        model_id: employee.id,
        event: 'phone',
      }
    });
  };

  const onSuccessComplaint = () => {
    setShowComplaintSuccessPopup(true);
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div>
        {employee.current_club ?
          <div className="flex">
            <div
              className={cx([
                employee.current_club.logo ? "" : "w-full"
              ])}
            >
              <div className="text-grey">
                {t('common.current_location')}
              </div>
              <div className="mt-3">
                <div>
                  <Link
                    href={`/clubs/canton/city/id/information?id=${employee.current_club.id}&canton=${employee.current_club.city.canton.slug}&city=${employee.current_club.city.slug}`}
                    as={`/clubs/${employee.current_club.city.canton.slug}/${employee.current_club.city.slug}/${employee.current_club.id}/information`}
                  >
                    <a className="font-bold text-red text-lg">
                      {employee.current_club.name}
                    </a>
                  </Link>
                </div>

                <div className="mt-1">
                  <button className="font-normal text-xs h-6 uppercase rounded-full px-2 bg-black text-white">
                    {employee.current_club.type.name}
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-bold text-lg">
                  {address}
                </span>

                <span className="ml-3 text-xs text-grey text-nowrap">
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
            </div>

            {employee.current_club.logo &&
              <div className="flex-none">
                <img
                  className="rounded-full border border-light-grey w-100px mt-2"
                  src={employee.current_club.logo.thumb_url}
                  alt=""
                />
              </div>
            }
          </div>
          :
          <>
            <div className="text-grey">
              {t('common.current_location')}
            </div>
            <div className="mt-3">
            <span className="font-bold text-lg">
              {address}
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
              doEvent({
                variables: {
                  model_type: 'employee',
                  model_id: employee.id,
                  event: 'route',
                }
              });

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
              {t('common.road_me')}
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
            onClick={() => showMePhone()}
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

        <CopyToClipboard
          text={window.location.href}
          onCopy={() => copy()}
        >
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
              {t('common.send_link')}
              {copied &&
                <span className={cx(
                  getTextColorClass(hover3),
                  "font-bold text-sm ml-2"
                )}>
                  ({t('common.copied')})
                </span>
              }
            </div>
          </Button>
        </CopyToClipboard>

        <EmployeeComplaintPopup
          employeeId={employee.id}
          user={user}
          onSuccess={onSuccessComplaint}
          trigger={
            <Button
              className="px-4 w-full flex items-center mt-2"
              size="sm"
              level="grey1"
              weight="normal"
              onMouseEnter={() => setHover4(true)}
              onMouseLeave={() => setHover4(false)}
            >
              <div className="w-12 h-8 flex justify-center items-center border-r border-light-grey mr-5 pr-3">
                <AttentionSvg color={getColor(hover4)}/>
              </div>
              <div className={cx(
                getTextColorClass(hover4),
                "font-bold text-lg"
              )}>
                {t('common.submit_complaint')}
              </div>
            </Button>
          }
        />

        <EmployeeComplaintSuccessPopup user={user} open={showComplaintSuccessPopup} setOpen={setShowComplaintSuccessPopup}/>
      </div>
    </div>
  );
};

export default geolocated()(CurrentLocation);