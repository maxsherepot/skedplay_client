import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "UI";
import { useFormikContext, useField } from "formik";

function CheckboxField({ className, checkboxClass, label, labelStyle = {}, name, ...rest }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = event => {
    setFieldValue(name, event.target.checked);
  };

  return (
    <label style={labelStyle}>
      <Checkbox
        checkboxClass={checkboxClass}
        name={name}
        checked={field.value}
        value={field.value}
        onChange={handleChange}
      />
      <span className={className} style={{ marginLeft: 4 }}>
        {label}
      </span>
    </label>
  );
}

CheckboxField.propTypes = {
  labelStyle: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default CheckboxField;
