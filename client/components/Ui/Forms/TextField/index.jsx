import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

import { FormGroup, Label } from "UI";

import formErrors from "services/formErrors";

function TextField({
  className,
  labelClassName,
  inputClassName,
  label,
  name,
  width,
  before,
  after,
  autoComplete,
  ...rest
}) {
  const { touched, errors, setFieldValue } = useFormikContext();

  const error = formErrors.getErrorText(name, label, touched, errors);

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <Label
        name={name}
        className={labelClassName}
        label={label}
        error={error}
      />

      <div className="absolute left-0 bottom-0 pb-3-5  ml-6">{before}</div>

      <Field name={name}>
        {({ field }) => (
          <input
            {...rest}
            autoComplete={autoComplete || 'off'}
            id={name}
            className={cx("form-control text-black", inputClassName, {
              "pl-10": before
            })}
            {...field}
            value={rest.value || field.value || ""}
            style={before ? { paddingLeft: "2.5rem" } : null}
            onChange={e => {
              rest.onChange ? rest.onChange(e) : null;
              field.onChange ? field.onChange(e) : null;
            }}
          />
        )}
      </Field>

      <div className="absolute right-0 bottom-0 pb-3-5  mr-6">{after}</div>
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
  after: PropTypes.node,
  type: PropTypes.oneOf(["text", "password", "email", "time"])
};

TextField.defaultProps = {
  type: "text",
  labelClassName: "text-grey"
};

export default TextField;
