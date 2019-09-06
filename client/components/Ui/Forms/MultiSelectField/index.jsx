import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { FieldArray, useFormikContext } from "formik";

import { FormGroup, Checkbox } from "UI";

function MultiSelectField({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  options
}) {
  const node = useRef();
  const [expanded, setExpanded] = useState(false);
  const { touched, errors, values } = useFormikContext();
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

      <FieldArray name={name}>
        {arrayHelpers => (
          <span
            ref={node}
            className={cx("multiselect", {
              expanded
            })}
            onClick={() => setExpanded(true)}
          >
            {/* {field && field.value.length === 0 && (
              <label id="placeholder" className="text-grey">
                {placeholder}
              </label>
            )} */}
            {options &&
              options.map((option, index) => (
                <>
                  <input
                    id={name}
                    name={name}
                    type="checkbox"
                    className="form-control"
                    value={option.id}
                    checked={values[name].includes(option.id)}
                    onChange={e => {
                      if (e.target.checked) arrayHelpers.push(option.id);
                      else {
                        const idx = values[name].indexOf(option.id);
                        arrayHelpers.remove(idx);
                      }
                    }}
                  />
                  <label htmlFor={name}>{option.label}</label>
                </>
              ))}
          </span>
        )}
      </FieldArray>
    </FormGroup>
  );
}

MultiSelectField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MultiSelectField;
