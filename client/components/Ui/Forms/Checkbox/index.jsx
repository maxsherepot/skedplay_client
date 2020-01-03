import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

const Checkbox = ({ className, checkboxClass, checked, ...props }) => (
  <div className={cx(className, "inline-block align-middle")}>
    <input type="checkbox" className={checkboxClass} checked={checked || false} {...props} />
    <div checked={checked}>
      <span />
    </div>
  </div>
);

Checkbox.propTypes = {
  className: PropTypes.string,
  checkboxClass: PropTypes.string,
  checked: PropTypes.bool,
};

export default Checkbox;
