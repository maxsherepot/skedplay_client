import React from "react";
import cx from "classnames";
import { Button } from "UI";
import { MapSvg } from "icons";
import Distance from "components/distance";

const DistanceView = ({ distanceValue }) => {
  if (!distanceValue) {
    return '';
  }

  const distanceKm = Math.round(distanceValue / 1000 * 10) / 10;

  return (
    <div className="flex items-center my-2">
      <MapSvg></MapSvg>
      <span className="ml-3">
        {distanceKm} km from me
      </span>
    </div>
  )
};

const AddressCard = ({ className, employee, isAvailable }) => {
  return (
    <>
      <div className="text-2xl font-extrabold my-5">Meine Adresse</div>
      <div className={cx("bg-white rounded-lg p-4", className)}>
        <p className="font-bold">{employee.address}</p>
        <Distance
          originByGeo={true}
          destination={{lat: employee.lat, lng: employee.lng}}
        >
          <DistanceView/>
        </Distance>
        {isAvailable && (
          <Button className="px-4" size="xxs" level="success" weight="normal">
            Available
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
