import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const FormGroup = ({ children, className, error, style }) => (
  <div
    className={cx("form-group", className, {
      error
    })}
    style={style}
  >
    {children}
  </div>
);

FormGroup.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  error: PropTypes.bool
};

export default FormGroup;
