import React from "react";
import cx from "classnames";
import { Button } from "UI";
import { MapSvg } from "icons";
import Distance from "components/distance";
import {useTranslation} from "react-i18next";

const DistanceView = ({ distanceValue }) => {
  if (!distanceValue) {
    return '';
  }

  const distanceKm = Math.round(distanceValue / 1000 * 10) / 10;
  const {t, i18n} = useTranslation();

  return (
    <div className="flex items-center my-2">
      <MapSvg></MapSvg>
      <span className="ml-3">
        {distanceKm} {t('index.km_from_me')}
      </span>
    </div>
  )
};


const AddressCard = ({ className, addressable, isAvailable }) => {
  const {t, i18n} = useTranslation();

  const addressComponent = (
      <>
        {(addressable.address || "").split(",").map((item, i) => {
            return (
                <span key={i}>{item.trim()}</span>
            )
        })}
      </>
  )

  return (
    <>
      <div className="text-2xl font-bold my-5">{t('index.my_address')}</div>
      <div className={cx("bg-white rounded-lg p-4", className)}>
        <p className="font-bold">{addressable ? addressComponent : 'default address'}</p>
        {(addressable && addressable.lat && addressable.lng) &&
          <Distance
            originByGeo={true}
            destination={{lat: addressable.lat, lng: addressable.lng}}
          >
            <DistanceView/>
          </Distance>
        }
        {isAvailable && (
          <Button className="px-4" size="xxs" level="success" weight="normal">
            {t('employees.available')}
          </Button>
        )}
      </div>
    </>
  );
};

AddressCard.defaultProps = {
  isAvailable: true
};

export default AddressCard;
