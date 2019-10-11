import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const Toggle = ({ className, checked, ...props }) => (
  <div className={cx(className, "relative h-full")}>
    <input type="checkbox" checked={checked || false} {...props} />

    {checked ? (
      <span className="absolute inset-0 h-full flex items-center justify-end">
        <span className="bg-red rounded-full w-7 h-7" />
      </span>
    ) : (
        <span className="absolute inset-0 h-full flex items-center">
          <span className="bg-black rounded-full w-7 h-7" />
        </span>
      )}
  </div>
);

Toggle.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default Toggle;
