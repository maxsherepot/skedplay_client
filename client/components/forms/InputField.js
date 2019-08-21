import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import classNames from "classnames";

function InputField({ label, name, error }) {
  return (
    <div className={classNames("form-group", { error })}>
      <label htmlFor={name}>{error ? error : label}</label>

      <Field
        name={name}
        render={({ field }) => <input className="form-control" {...field} />}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default InputField;
