import React from "react";
import cx from "classnames";
import dot from "dot-object";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

import { FormGroup, Label } from "UI";

function TextField({
  className,
  labelClassName,
  inputClassName,
  label,
  name,
  width,
  before,
  after,
  ...rest
}) {
  const { touched, errors } = useFormikContext();

  const currentTouched = dot.pick(name, touched);
  const currentError = dot.pick(name, errors);

  let error = currentTouched && currentError ? currentError : null;

  if (error) {
    error = error.replace(name, label);
  }

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
            id={name}
            className={cx("form-control", inputClassName, {
              "pl-10": before
            })}
            {...field}
            value={field.value || ""}
            style={before ? { paddingLeft: "2.5rem" } : null}
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
  type: PropTypes.oneOf(["text", "password"])
};

TextField.defaultProps = {
  type: "text",
  labelClassName: "text-grey"
};

export default TextField;
