import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "UI";
import { useFormikContext, useField } from "formik";

function CheckboxField({ className, checkboxClass, label, labelStyle = {}, labelClass, name, checked, checkedOnlyByProp, onChange, ...rest }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = event => {
    if (onChange) {
      onChange(event.target.checked);
    }
    setFieldValue(name, event.target.checked);
  };

  return (
    <label style={labelStyle} className={labelClass}>
      <Checkbox
        checkboxClass={checkboxClass}
        name={name}
        checked={checkedOnlyByProp ? checked : field.value || checked}
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
  name: PropTypes.string
};

export default CheckboxField;
