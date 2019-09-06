import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";

import { FormGroup } from "UI";

function SelectField({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  options
}) {
  const node = useRef();
  const [expanded, setExpanded] = useState(false);
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setExpanded(false);
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

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
          <span
            ref={node}
            className={cx("select", {
              expanded
            })}
            onClick={() => setExpanded(true)}
          >
            {value === "" && (
              <label id="placeholder" className="text-grey">
                {placeholder}
              </label>
            )}
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
                    htmlFor={`${name}-${option.value}`}
                    onClick={() => setFieldValue(name, option.value, false)}
                  >
                    {option.label}
                  </label>
                </Fragment>
              ))}
          </span>
        )}
      </Field>
    </FormGroup>
  );
}

SelectField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default SelectField;
