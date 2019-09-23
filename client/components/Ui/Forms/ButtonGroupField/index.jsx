import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import { FormGroup } from "UI";

function ButtonGroupField({ className, label, name, items }) {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  if (!items) return null;

  return (
    <FormGroup className={className} error={error ? true : false}>
      <label className="text-grey" htmlFor={name}>
        {error ? error : label}
      </label>

      <div className="button-group">
        <Field name={name}>
          {({ field }) =>
            items.map(item => {
              const isActive = field.value === item.value;

              return (
                <button
                  type="button"
                  key={item.value}
                  className={cx("button", {
                    active: isActive
                  })}
                  onClick={() => setFieldValue(name, item.value, false)}
                >
                  {item.name}
                </button>
              );
            })
          }
        </Field>
      </div>
    </FormGroup>
  );
}

ButtonGroupField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

export default ButtonGroupField;
