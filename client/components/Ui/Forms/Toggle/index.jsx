import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const Toggle = ({ className, checked, trueLabel, falseLabel }) => {
  return (
    <div className={cx(
      className,
      "h-full cursor-pointer",
      "flex justify-between items-center transition",
      checked ? "" : "flex-row-reverse",
    )}>
      <span
        className={cx([
          checked ? "" : "",
        ])}
      >
        {checked ? trueLabel : falseLabel}
      </span>

      <span
        className={cx([
          "transition rounded-full w-7 h-7",
          checked ? "bg-red" : "bg-black",
        ])}
      />



      {/*{checked ? (*/}
      {/*  <span */}
      {/*    className="absolute inset-0 h-full flex items-center justify-end"*/}
      {/*  >*/}
      {/*    <span className="bg-red rounded-full w-7 h-7" />*/}
      {/*  </span>*/}
      {/*) : (*/}
      {/*  <span className="absolute inset-0 h-full flex items-center">*/}
      {/*    <span className="bg-black rounded-full w-7 h-7" />*/}
      {/*  </span>*/}
      {/*)}*/}
    </div>
  );
};

Toggle.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default Toggle;
