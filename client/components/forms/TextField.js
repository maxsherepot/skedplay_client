import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import classNames from "classnames";

function TextField({ className, label, name, error }) {
  return (
    <div className={classNames("form-group", className, { error })}>
      <label htmlFor={name}>{error ? error : label}</label>

      <Field
        name={name}
        render={({ field }) => (
          <input type="text" id={name} className="form-control" {...field} />
        )}
      />
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default TextField;
