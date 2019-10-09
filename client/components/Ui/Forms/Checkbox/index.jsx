import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const Checkbox = ({ className, checked, ...props }) => (
  <div className={cx(className, "inline-block align-middle")}>
    <input type="checkbox" checked={checked || false} {...props} />
    <div checked={checked}>
      <span />
    </div>
  </div>
);

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
};

export default Checkbox;
