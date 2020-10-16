import React from "react";
import cx from "classnames";

const EventLabel = ({ type: { name = "" } = {} }) => {
  const colorsMap = {
    "Special days": "bg-yellow text-black",
    "Parties and Shows": "bg-light-blue text-black",
    "Discount": "bg-white text-black",
  };

  return (
    <button
      className={cx(
        "font-normal text-xs h-6 uppercase rounded-full px-2 lg:px-4",
        colorsMap[name]
      )}
    >
      {name}
    </button>
  );
};

export default EventLabel;
