import "./FormGroup.scss";

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const FormGroup = ({ children, className, error }) => (
  <div
    className={classNames("form-group", className, {
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
