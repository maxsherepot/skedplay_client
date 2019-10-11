import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Toggle } from "UI";
import { useFormikContext, useField } from "formik";

function CheckboxField({ className, label, name, ...rest }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = event => {
    setFieldValue(name, event.target.checked);
  };

  return (
    <label className={cx("form-control relative", className)}>
      <Toggle
        name={name}
        checked={field.value || true}
        value={field.value}
        onChange={handleChange}
      />
      <span className="absolute inset-0 flex items-center ml-6 text-lg">
        {label}
      </span>
    </label>
  );
}

CheckboxField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default CheckboxField;
