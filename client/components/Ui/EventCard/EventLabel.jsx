import React from "react";
import cx from "classnames";

const EventLabel = ({ type: { name = "" } = {} }) => {
  const colorsMap = {
    "special-day": "bg-yellow text-black",
    "parties-and-shows": "bg-light-blue text-black",
    discount: "bg-red"
  };

  return (
    <button
      className={cx(
        "font-normal text-xs h-6 uppercase rounded-full px-2 lg:px-4",
        colorsMap[name]
      )}
    >
      {name.replace(/-/g, " ")}
    </button>
  );
};

export default EventLabel;
