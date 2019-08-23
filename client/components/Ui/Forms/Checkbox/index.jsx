import "./Checkbox.scss";

import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

function Checkbox({ label, name }) {
  const { touched, errors } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <Field name={name}>
      {({ field }) => (
        <>
          <input
            type="checkbox"
            id={name}
            className="form-control"
            {...field}
          />
          <label htmlFor={name}>
            <span /> {error ? error : label}
          </label>
        </>
      )}
    </Field>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Checkbox;
