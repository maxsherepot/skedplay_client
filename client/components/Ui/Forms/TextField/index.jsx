import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

import { FormGroup } from "UI";

function TextField({
  className,
  labelClassName,
  inputClassName,
  label,
  name,
  width,
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
          <input
            {...rest}
            id={name}
            className={cx("form-control", inputClassName)}
            {...field}
          />
        )}
      </Field>
    </FormGroup>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"])
};

TextField.defaultProps = {
  type: "text",
  labelClassName: "text-grey"
};

export default TextField;
