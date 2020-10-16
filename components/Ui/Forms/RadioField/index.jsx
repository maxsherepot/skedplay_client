import React, { Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {useField, useFormikContext} from "formik";
import cx from 'classnames';

function RadioField({ className, name, items, handleChange, defaultValue }) {
  if (!items) return null;

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const setValue = e => {
    setFieldValue(name, e.target.value);
    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  return (
    <div className={classNames("form-radio", className)}>
      {items.map((item, index) => {
        const indexName = `${name}_${index}`;

        return (
          <label key={indexName} className={cx(item.class, "inline-block")} style={item.style}>
            <div className="inline-block align-middle ">
              <input
                type="radio"
                name={name}
                value={item.value}
                checked={`${field.value}` === `${item.value}`}
                onChange={setValue}
              />
              <div>
                <span />
              </div>
            </div>

            <span className="align-middle">
              {item.name}
            </span>
          </label>
        );
      })}
    </div>
  );
}

RadioField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
  // defaultValue: PropTypes.string
};

export default RadioField;
