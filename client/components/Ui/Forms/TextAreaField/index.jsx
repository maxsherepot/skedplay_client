import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

import { FormGroup } from "UI";

function TextField({
  className,
  labelClassName,
  label,
  name,
  textLength,
  ...rest
}) {
  const { touched, errors } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <FormGroup className={className} error={error ? true : false}>
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>
        {({ field }) => (
          <>
            <span className="absolute right-0 top-0 pr-5 text-sm text-grey">
              {(field.value && field.value.length) || 0} / {textLength}
            </span>
            <textarea
              {...rest}
              id={name}
              className="form-control"
              {...field}
              style={{ height: "auto", borderRadius: "1rem" }}
            />
          </>
        )}
      </Field>
    </FormGroup>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

TextField.defaultProps = {
  className: "relative",
  labelClassName: "text-grey",
  textLength: 255
};

export default TextField;