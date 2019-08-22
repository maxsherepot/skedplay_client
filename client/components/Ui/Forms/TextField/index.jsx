import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import classNames from "classnames";

function TextField({ className, label, name, ...rest }) {
  const { touched, errors } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <div
      className={classNames("form-group", className, {
        error
      })}
    >
      <label htmlFor={name}>{error ? error : label}</label>

      <Field name={name}>
        {({ field }) => (
          <input {...rest} id={name} className="form-control" {...field} />
        )}
      </Field>
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "password"])
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
