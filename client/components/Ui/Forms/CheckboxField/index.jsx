import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "UI";
import { useFormikContext, useField } from "formik";
import formErrors from "services/formErrors";

function CheckboxField({ className, checkboxClass, label, labelStyle = {}, labelClass, name, checked, checkedOnlyByProp, onChange, ...rest }) {
  const { touched, errors, values, setFieldValue } = useFormikContext();
  const error = formErrors.getErrorText(name || "", label || "", touched || {}, errors || {});
  const [field, meta] = useField(name);

  const handleChange = event => {
    if (onChange) {
      onChange(event.target.checked);
    }
    setFieldValue(name, event.target.checked);
  };

  return (
      <>
          <label style={{display: "flex", ...(labelStyle || {})}} className={(labelClass || "") + " flex items-center "}>
            <Checkbox
              checkboxClass={checkboxClass}
              name={name}
              checked={checkedOnlyByProp ? checked : field.value || checked}
              value={field.value}
              onChange={handleChange}
            />
            <span className={"flex flex-col " + className} style={{ marginLeft: 4 }}>
                <span>{label}</span>
                {error && <span className="text-red text-sm">{error}</span>}
            </span>
          </label>
      </>
  );
}

CheckboxField.propTypes = {
  labelStyle: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CheckboxField;
