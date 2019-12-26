import React, { Fragment } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";

import { FormGroup, Dropdown } from "UI";

function SelectField({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  options,
  disabled
}) {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const getLabel = value => {
    const index = options.map(o => o.value).indexOf(value);

    return options[index] ? options[index].label : "";
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={error ? true : false}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>
        {({ field: { value, ...rest } }) => (
          <Dropdown
            disabled={disabled}
            trigger={
              !disabled && (
                <div
                  className={cx(
                    "flex items-center h-full pl-4 text-sm",
                    !value ? "text-grey" : "text-black"
                  )}
                >
                  {!value ? placeholder : getLabel(value)}
                </div>
              )
            }
          >
            {options &&
              options.map((option, index) => (
                <Fragment key={index}>
                  <input
                    id={`${name}-${option.value}`}
                    type="radio"
                    value={option.value || ""}
                    checked={value === option.value}
                    name={name}
                    {...rest}
                  />
                  <label
                    className={cx(
                      "cursor-pointer leading-loose hover:text-red select-none",
                      value === option.value ? "text-red" : "text-black"
                    )}
                    htmlFor={`${name}-${option.value}`}
                    onClick={() => setFieldValue(name, option.value, false)}
                  >
                    {option.label}
                  </label>
                </Fragment>
              ))}
          </Dropdown>
        )}
      </Field>
    </FormGroup >
  );
}

SelectField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

SelectField.defaultProps = {
  labelClassName: "text-grey"
};

export default SelectField;
