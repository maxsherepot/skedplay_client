import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const FormGroup = ({ children, className, error }) => (
  <div
    className={cx("form-group", className, {
      error
    })}
  >
    {children}
  </div>
);

FormGroup.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool
};

export default FormGroup;
