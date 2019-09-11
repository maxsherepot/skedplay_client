import React from "react";
import cx from "classnames";
import { Button } from "UI";
import { MapSvg } from "icons";

function AddressCard({ className }) {
  return (
    <>
      <div className="text-2xl font-black my-5">Meine Adresse</div>
      <div className={cx("bg-white p-4", className)}>
        <p className="font-bold">Badenersrasse 109, 8004 Zurich</p>
        <div className="flex my-4">
          <MapSvg></MapSvg>
          <span className="ml-3">12 km from me</span>
        </div>
        <Button className="px-4" size="xxs" level="success" weight="normal">
          Available
        </Button>
      </div>
    </>
  );
}

export default AddressCard;
