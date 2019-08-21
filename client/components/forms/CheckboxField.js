import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";

function CheckboxField({ label, name, error }) {
  return (
    <Field
      name={name}
      render={({ field }) => (
        <Fragment>
          <input
            type="checkbox"
            id={name}
            className="form-control"
            {...field}
          />
          <label htmlFor={name}>
            <span /> {error ? error : label}
          </label>
        </Fragment>
      )}
    />
  );
}

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default CheckboxField;
